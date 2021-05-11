import { createStore, Store } from "../store";
import { MockPlayer } from "./MockPlayer";
import { Guess } from "./Player";
import {
  addFirstDescriptionToPlayer,
  addFirstGuessToPlayer,
  addSecondDescriptionToPlayer,
  addSecondGuessToPlayer,
  selectPlayers,
  selectStatus,
  startGame,
  startNewRound,
} from "./gameSlice";
import { Status } from "./Status";
import { MockChannel } from "../../services/channel/MockChannel";

describe("gameSlice", () => {
  const players = Array.from(Array(5)).map(
    () => new MockPlayer({ descriptions: [] })
  );
  const wordList = ["foo", "bar"];

  let store: Store;
  beforeEach(() => {
    store = createStore(() => new MockChannel());
  });

  it("starts with status WaitingForGameStart", () => {
    expect(selectStatus(store.getState())).toBe(Status.WaitingForGameStart);
  });

  it("starts without any players", () => {
    expect(selectPlayers(store.getState())).toEqual([]);
  });

  describe("startGame", () => {
    it("sets the players", () => {
      store.dispatch(startGame({ players, wordList }));
      expect(
        selectPlayers(store.getState()).map((player) => player.name)
      ).toEqual(players.map((player) => player.name));
    });

    it("distributes two words and a question mark between all players", () => {
      store.dispatch(startGame({ players, wordList }));
      expect(
        selectPlayers(store.getState()).map((player) => player.word)
      ).toIncludeSameMembers([...wordList, ...wordList, null]);
    });

    it("sets the players points to 0", () => {
      store.dispatch(startGame({ players, wordList }));
      expect(
        selectPlayers(store.getState()).map((player) => player.points)
      ).toIncludeAllMembers([5]);
    });
  });

  describe("after the game started", () => {
    const playersWithWords = [
      new MockPlayer({ guesses: [], descriptions: [], word: "foo" }),
      new MockPlayer({ guesses: [], descriptions: [], word: "foo" }),
      new MockPlayer({ guesses: [], descriptions: [], word: "bar" }),
      new MockPlayer({ guesses: [], descriptions: [], word: "bar" }),
      new MockPlayer({ guesses: [], descriptions: [], word: null }),
    ];

    beforeEach(() => {
      store.dispatch({ type: startGame.type, payload: playersWithWords });
    });

    describe("addFirstDescriptionToPlayer", () => {
      it("adds the description to the player", () => {
        const description = "Description";
        const id = playersWithWords[0].id;
        store.dispatch(addFirstDescriptionToPlayer({ description, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ descriptions: [description] });
      });

      it("overwrites an existing description", () => {
        const oldDescription = "Old Description";
        const newDescription = "New Description";
        const id = playersWithWords[0].id;
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
          playersWithWords.forEach((player) => {
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
        playersWithWords.forEach((player) => {
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
        const id = playersWithWords[0].id;
        store.dispatch(addSecondDescriptionToPlayer({ description, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ descriptions: [expect.anything(), description] });
      });

      it("overwrites an existing description", () => {
        const oldDescription = "Old Description";
        const newDescription = "New Description";
        const id = playersWithWords[0].id;
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
          playersWithWords.forEach((player) => {
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
        const guess: Guess = [playersWithWords[0].id, playersWithWords[1].id];
        const id = playersWithWords[0].id;
        store.dispatch(addFirstGuessToPlayer({ guess, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ guesses: [guess] });
      });

      it("overwrites an existing guess", () => {
        const oldGuess: Guess = [
          playersWithWords[0].id,
          playersWithWords[1].id,
        ];
        const newGuess: Guess = [
          playersWithWords[2].id,
          playersWithWords[3].id,
        ];
        const id = playersWithWords[0].id;
        store.dispatch(addFirstGuessToPlayer({ guess: oldGuess, id }));
        store.dispatch(addFirstGuessToPlayer({ guess: newGuess, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ guesses: [newGuess] });
      });

      describe("when all players have one guess", () => {
        beforeEach(() => {
          const guess: Guess = [playersWithWords[0].id, playersWithWords[1].id];
          playersWithWords.forEach((player) => {
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
        const guess: Guess = [playersWithWords[0].id, playersWithWords[1].id];
        playersWithWords.forEach((player) => {
          store.dispatch(
            addFirstGuessToPlayer({
              guess,
              id: player.id,
            })
          );
        });
      });

      it("adds the guess to the player", () => {
        const guess: Guess = [playersWithWords[0].id, playersWithWords[1].id];
        const id = playersWithWords[0].id;
        store.dispatch(addSecondGuessToPlayer({ guess, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ guesses: [expect.anything(), guess] });
      });

      it("overwrites an existing guess", () => {
        const oldGuess: Guess = [
          playersWithWords[0].id,
          playersWithWords[1].id,
        ];
        const newGuess: Guess = [
          playersWithWords[2].id,
          playersWithWords[3].id,
        ];
        const id = playersWithWords[0].id;
        store.dispatch(addSecondGuessToPlayer({ guess: oldGuess, id }));
        store.dispatch(addSecondGuessToPlayer({ guess: newGuess, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ guesses: [expect.anything(), newGuess] });
      });

      describe("when all players have two guesses", () => {
        beforeEach(() => {
          const guess: Guess = [playersWithWords[0].id, playersWithWords[1].id];
          playersWithWords.forEach((player) => {
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

        it("adds 1 point to a player who guessed another pair correctly", () => {
          expect(selectPlayers(store.getState())[2].points).toBe(5 + 1);
        });
      });
    });
    describe("startNewRound", () => {
      const newWordList = ["apples", "bananas"];

      beforeEach(() => {
        store.dispatch(startGame({ players, wordList }));
        const guess: Guess = [players[0].id, players[1].id];
        players.forEach((player) => {
          store.dispatch(
            addFirstDescriptionToPlayer({
              description: "Description",
              id: player.id,
            })
          );
          store.dispatch(
            addFirstGuessToPlayer({
              guess,
              id: player.id,
            })
          );
          store.dispatch(
            addSecondDescriptionToPlayer({
              description: "Description",
              id: player.id,
            })
          );
          store.dispatch(
            addSecondGuessToPlayer({
              guess,
              id: player.id,
            })
          );
        });
      });

      it("changes the status to ChoosingFirstDescription", () => {
        store.dispatch(startNewRound(players, newWordList));
        expect(selectStatus(store.getState())).toBe(
          Status.ChoosingFirstDescription
        );
      });

      it("resets descriptions for all players", () => {
        store.dispatch(startNewRound(players, newWordList));
        expect(
          selectPlayers(store.getState()).map((player) => player.descriptions)
        ).toIncludeAllMembers([[]]);
      });

      it("resets guesses for all players", () => {
        store.dispatch(startNewRound(players, newWordList));
        expect(
          selectPlayers(store.getState()).map((player) => player.guesses)
        ).toIncludeAllMembers([[]]);
      });

      it("distributes words from the new word list", () => {
        store.dispatch(startNewRound(players, newWordList));
        expect(
          selectPlayers(store.getState()).map((player) => player.word)
        ).toIncludeAllMembers(newWordList);
      });
    });
  });
});
