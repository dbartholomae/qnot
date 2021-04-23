import { createStore, Store } from "../store/store";
import { selectStatus, startNewRound, Status } from "./gameSlice";

describe("gameSlice", () => {
  let store: Store;
  beforeEach(() => {
    store = createStore();
  });

  it("starts with status WaitingForGameStart", () => {
    expect(selectStatus(store.getState())).toBe(Status.WaitingForGameStart);
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
