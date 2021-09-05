import { MockChannel } from "../../services/channel/MockChannel";
import { createStore, Store } from "../store";
import { selectId, selectName, setName } from "./meSlice";

describe("meSlice", () => {
  let store: Store;

  beforeEach(() => {
    localStorage.clear();
    store = createStore(() => new MockChannel());
  });

  it("starts with no name", () => {
    expect(selectName(store.getState())).toBeNull();
  });

  it("allows to update the name", () => {
    const name = "Daniel";
    store.dispatch(setName(name));
    expect(selectName(store.getState())).toBe(name);
  });

  it("starts with an id", () => {
    expect(typeof selectId(store.getState())).toBe("string");
  });
});
