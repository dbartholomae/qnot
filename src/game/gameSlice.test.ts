import { createStore, Store } from "../store/store";
import {
  selectPlayers,
  selectStatus,
  startNewRound,
  Status,
} from "./gameSlice";

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

  describe("startNewRound", () => {
    it("changes the status to ChoosingFirstDescription", () => {
      store.dispatch(startNewRound());
      expect(selectStatus(store.getState())).toBe(
        Status.ChoosingFirstDescription
      );
    });
  });
});
