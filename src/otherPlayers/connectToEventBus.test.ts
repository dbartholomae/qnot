import { MockEventBus } from "../eventBus/MockEventBus";
import { createStore } from "../store/store";
import { selectPlayers } from "./otherPlayersSlice";
import { connectToEventBus } from "./connectToEventBus";

describe("connectToEventBus", () => {
  it("adds a player who joins to the players list", () => {
    const eventBus = new MockEventBus();
    const store = createStore();
    connectToEventBus(eventBus, store);
    const name = "Daniel";
    const id = "550e8400-e29b-11d4-a716-446655440000";
    eventBus.publish("joinRoom", { id, name });
    expect(selectPlayers(store.getState())).toContainEqual(
      expect.objectContaining({ id, name })
    );
  });
});
