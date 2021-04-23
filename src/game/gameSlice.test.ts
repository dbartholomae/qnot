import { createStore, Store } from "../store/store";
import {
  selectPlayers,
  selectSeed,
  selectStatus,
  selectWordList,
  startGame,
  Status,
} from "./gameSlice";
import { MockPlayer } from "./MockPlayer";

describe("gameSlice", () => {
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
    const seed = "random-seed";
    const players = Array.from(Array(5)).map(() => new MockPlayer());
    const wordList = ["foo", "bar"];

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
});
