import { createStore, Store } from "../store/store";
import { MockPlayer } from "./MockPlayer";
import { Guess } from "./Player";
import {
  addFirstDescriptionToPlayer,
  addFirstGuessToPlayer,
  addSecondDescriptionToPlayer,
  addSecondGuessToPlayer,
  selectPlayers,
  selectSeed,
  selectStatus,
  selectWordList,
  startGame,
} from "./gameSlice";
import { Status } from "./Status";

describe("gameSlice", () => {
  const seed = "random-seed";
  const players = Array.from(Array(5)).map(() => new MockPlayer());
  const wordList = ["foo", "bar"];

  let store: Store;
  beforeEach(() => {
    store = createStore();
  });

  it("starts with status WaitingForGameStart", () => {
    expect(selectStatus(store.getState())).toBe(Status.WaitingForGameStart);
  });

  it("starts without any players", () => {
    expect(selectPlayers(store.getState())).toEqual([]);
  });

  describe("startGame", () => {
    it("sets the players", () => {
      store.dispatch(startGame({ players, seed, wordList }));
      expect(
        selectPlayers(store.getState()).map((player) => player.name)
      ).toEqual(players.map((player) => player.name));
    });

    it("sets the word list", () => {
      store.dispatch(startGame({ players, seed, wordList }));
      expect(selectWordList(store.getState())).toEqual(wordList);
    });

    it("sets the seed", () => {
      store.dispatch(startGame({ players, seed, wordList }));
      expect(selectSeed(store.getState())).toEqual(seed);
    });

    it("distributes two words and a question mark between all players", () => {
      store.dispatch(startGame({ players, seed, wordList }));
      expect(
        selectPlayers(store.getState()).map((player) => player.word)
      ).toIncludeSameMembers([...wordList, ...wordList, null]);
    });
  });

  describe("after the game started", () => {
    beforeEach(() => {
      store.dispatch(startGame({ players, seed, wordList }));
    });

    describe("addFirstDescriptionToPlayer", () => {
      it("adds the description to the player", () => {
        const description = "Description";
        const id = players[0].id;
        store.dispatch(addFirstDescriptionToPlayer({ description, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ descriptions: [description] });
      });

      it("overwrites an existing description", () => {
        const oldDescription = "Old Description";
        const newDescription = "New Description";
        const id = players[0].id;
        store.dispatch(
          addFirstDescriptionToPlayer({ description: oldDescription, id })
        );
        store.dispatch(
          addFirstDescriptionToPlayer({ description: newDescription, id })
        );
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ descriptions: [newDescription] });
      });

      describe("when all players have one description", () => {
        beforeEach(() => {
          players.forEach((player) => {
            store.dispatch(
              addFirstDescriptionToPlayer({
                description: "Description",
                id: player.id,
              })
            );
          });
        });

        it("changes the status to GuessingFirstTeam", () => {
          expect(selectStatus(store.getState())).toBe(Status.GuessingFirstTeam);
        });
      });
    });

    describe("addSecondDescriptionToPlayer", () => {
      beforeEach(() => {
        players.forEach((player) => {
          store.dispatch(
            addFirstDescriptionToPlayer({
              description: "Description",
              id: player.id,
            })
          );
        });
      });

      it("adds the description to the player", () => {
        const description = "Description";
        const id = players[0].id;
        store.dispatch(addSecondDescriptionToPlayer({ description, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ descriptions: [expect.anything(), description] });
      });

      it("overwrites an existing description", () => {
        const oldDescription = "Old Description";
        const newDescription = "New Description";
        const id = players[0].id;
        store.dispatch(
          addSecondDescriptionToPlayer({ description: oldDescription, id })
        );
        store.dispatch(
          addSecondDescriptionToPlayer({ description: newDescription, id })
        );
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ descriptions: [expect.anything(), newDescription] });
      });

      describe("when all players have two descriptions", () => {
        beforeEach(() => {
          players.forEach((player) => {
            store.dispatch(
              addSecondDescriptionToPlayer({
                description: "Description",
                id: player.id,
              })
            );
          });
        });

        it("changes the status to GuessingSecondTeam", () => {
          expect(selectStatus(store.getState())).toBe(
            Status.GuessingSecondTeam
          );
        });
      });
    });

    describe("addFirstGuessToPlayer", () => {
      it("adds the guess to the player", () => {
        const guess: Guess = [players[0].id, players[1].id];
        const id = players[0].id;
        store.dispatch(addFirstGuessToPlayer({ guess, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ guesses: [guess] });
      });

      it("overwrites an existing guess", () => {
        const oldGuess: Guess = [players[0].id, players[1].id];
        const newGuess: Guess = [players[2].id, players[3].id];
        const id = players[0].id;
        store.dispatch(addFirstGuessToPlayer({ guess: oldGuess, id }));
        store.dispatch(addFirstGuessToPlayer({ guess: newGuess, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ guesses: [newGuess] });
      });

      describe("when all players have one guess", () => {
        beforeEach(() => {
          const guess: Guess = [players[0].id, players[1].id];
          players.forEach((player) => {
            store.dispatch(
              addFirstGuessToPlayer({
                guess,
                id: player.id,
              })
            );
          });
        });

        it("changes the status to ChoosingSecondDescription", () => {
          expect(selectStatus(store.getState())).toBe(
            Status.ChoosingSecondDescription
          );
        });
      });
    });

    describe("addSecondGuessToPlayer", () => {
      beforeEach(() => {
        const guess: Guess = [players[0].id, players[1].id];
        players.forEach((player) => {
          store.dispatch(
            addFirstGuessToPlayer({
              guess,
              id: player.id,
            })
          );
        });
      });

      it("adds the guess to the player", () => {
        const guess: Guess = [players[0].id, players[1].id];
        const id = players[0].id;
        store.dispatch(addSecondGuessToPlayer({ guess, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ guesses: [expect.anything(), guess] });
      });

      it("overwrites an existing guess", () => {
        const oldGuess: Guess = [players[0].id, players[1].id];
        const newGuess: Guess = [players[2].id, players[3].id];
        const id = players[0].id;
        store.dispatch(addSecondGuessToPlayer({ guess: oldGuess, id }));
        store.dispatch(addSecondGuessToPlayer({ guess: newGuess, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ guesses: [expect.anything(), newGuess] });
      });

      describe("when all players have two guesses", () => {
        beforeEach(() => {
          const guess: Guess = [players[0].id, players[1].id];
          players.forEach((player) => {
            store.dispatch(
              addSecondGuessToPlayer({
                guess,
                id: player.id,
              })
            );
          });
        });

        it("changes the status to GameOver", () => {
          expect(selectStatus(store.getState())).toBe(Status.GameOver);
        });
      });
    });
  });
});
