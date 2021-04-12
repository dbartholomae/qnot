import { createStore } from "../store/store";
import { selectName, setName } from "./meSlice";

describe("meSlice", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with no name", () => {
    const store = createStore();
    expect(selectName(store.getState())).toBeNull();
  });

  it("allows to update the name", () => {
    const store = createStore();
    const name = "Daniel";
    store.dispatch(setName(name));
    expect(selectName(store.getState())).toBe(name);
  });
});
