import { MockEventBus } from "../eventBus/MockEventBus";
import { createStore } from "../store/store";
import { selectPlayers } from "./playersSlice";
import { connectToEventBus } from "./connectToEventBus";

describe("connectToEventBus", () => {
  it("adds a player who joins to the players list", () => {
    const eventBus = new MockEventBus();
    const store = createStore();
    connectToEventBus(eventBus, store);
    const name = "Daniel";
    eventBus.publish("joinRoom", { name });
    expect(selectPlayers(store.getState())).toContainEqual(
      expect.objectContaining({ name })
    );
  });
});
