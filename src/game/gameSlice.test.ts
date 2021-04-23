import { createStore, Store } from "../store/store";
import {
  selectPlayers,
  selectStatus,
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
    it("sets the players", () => {
      const players = Array.from(Array(5)).map(() => new MockPlayer());
      store.dispatch(startGame(players));
      expect(selectPlayers(store.getState())).toEqual(players);
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
