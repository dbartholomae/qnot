import { MockChannel } from "../channel/MockChannel";
import { createStore } from "../store/store";
import { selectPlayers } from "./playersSlice";
import { connectToChannel } from "./connectToChannel";

describe("connectToChannel", () => {
  it("adds a player who joins to the players list", () => {
    const channel = new MockChannel();
    const store = createStore();
    connectToChannel(channel, store);
    const name = "Daniel";
    const id = "550e8400-e29b-11d4-a716-446655440000";
    channel.presence.enterClient(id, { name });
    expect(selectPlayers(store.getState())).toContainEqual(
      expect.objectContaining({ id, name })
    );
  });

  it("adds a player who already was in the room", () => {
    const channel = new MockChannel();
    const store = createStore();
    const name = "Daniel";
    const id = "550e8400-e29b-11d4-a716-446655440000";
    channel.presence.enterClient(id, { name });
    connectToChannel(channel, store);
    expect(selectPlayers(store.getState())).toContainEqual(
      expect.objectContaining({ id, name })
    );
  });

  it("marks a player who leaves as offline", () => {
    const channel = new MockChannel();
    const store = createStore();
    const name = "Daniel";
    const id = "550e8400-e29b-11d4-a716-446655440000";
    channel.presence.enterClient(id, { name });
    connectToChannel(channel, store);
    channel.presence.leaveClient(id, { name });
    expect(selectPlayers(store.getState())).toContainEqual(
      expect.objectContaining({ id, name, isOnline: false })
    );
  });
});
