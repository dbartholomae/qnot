import { createStore, Store } from "../store/store";
import {
  addDescriptionToPlayer,
  addGuessToPlayer,
  selectPlayers,
  selectSeed,
  selectStatus,
  selectWordList,
  startGame,
  Status,
} from "./gameSlice";
import { MockPlayer } from "./MockPlayer";
import { Guess } from "./Player";

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
    describe("addDescriptionToPlayer", () => {
      it("adds the description to the player", () => {
        const description = "Description";
        const id = players[0].id;
        store.dispatch(addDescriptionToPlayer({ description, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ descriptions: [description] });
      });

      describe("when all players have one description", () => {
        beforeEach(() => {
          players.forEach((player) => {
            store.dispatch(
              addDescriptionToPlayer({
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

      describe("when all players have two descriptions", () => {
        beforeEach(() => {
          players.forEach((player) => {
            store.dispatch(
              addDescriptionToPlayer({
                description: "Description",
                id: player.id,
              })
            );

            store.dispatch(
              addDescriptionToPlayer({
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

    describe("addGuessToPlayer", () => {
      it("adds the guess to the player", () => {
        const guess: Guess = [players[0].id, players[1].id];
        const id = players[0].id;
        store.dispatch(addGuessToPlayer({ guess, id }));
        expect(
          selectPlayers(store.getState()).find((player) => player.id === id)
        ).toMatchObject({ guesses: [guess] });
      });

      describe("when all players have one guess", () => {
        beforeEach(() => {
          const guess: Guess = [players[0].id, players[1].id];
          players.forEach((player) => {
            store.dispatch(
              addGuessToPlayer({
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
  });
});
