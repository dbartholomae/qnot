import { createStore, Store } from "../store/store";
import {
  selectPlayers,
  selectStatus,
  selectWordList,
  startGame,
  startNewRound,
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
    const players = Array.from(Array(5)).map(() => new MockPlayer());
    const wordList = ["foo", "bar", "baz"];

    it("sets the players", () => {
      store.dispatch(startGame({ players, wordList }));
      expect(selectPlayers(store.getState())).toEqual(players);
    });

    it("sets the word list", () => {
      store.dispatch(startGame({ players, wordList }));
      expect(selectWordList(store.getState())).toEqual(wordList);
    });
  });

  describe("startNewRound", () => {
    it("changes the status to ChoosingFirstDescription", () => {
      store.dispatch(startNewRound());
      expect(selectStatus(store.getState())).toBe(
        Status.ChoosingFirstDescription
      );
    });
  });
});
