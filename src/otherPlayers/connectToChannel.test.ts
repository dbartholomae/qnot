import { MockChannel } from "../channel/MockChannel";
import { createStore } from "../store/store";
import { selectPlayers } from "./otherPlayersSlice";
import { connectToChannel } from "./connectToChannel";
import { selectId } from "../me/meSlice";

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

  it("ignores my own join events", () => {
    const channel = new MockChannel();
    const store = createStore();
    connectToChannel(channel, store);
    const name = "Daniel";
    const id = selectId(store.getState());
    channel.presence.enterClient(id, { name });
    expect(selectPlayers(store.getState())).not.toContainEqual(
      expect.objectContaining({ id, name })
    );
  });
});
