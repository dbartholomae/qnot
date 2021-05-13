import { createMemoryHistory, MemoryHistory } from "history";
import { render, waitFor } from "@testing-library/react";
import { createTestProviders } from "../../testUtils/createTestProviders";
import React from "react";
import { getRoomPath } from "./getRoomPath";
import { selectId, setName } from "../../business-logic/me/meSlice";
import { Channel } from "../../services/channel/Channel";
import { createStore, Store } from "../../business-logic/store";
import { MockChannel } from "../../services/channel/MockChannel";
import { GameRoomView } from "./GameRoomView";

describe("GameRoomView", () => {
  let history: MemoryHistory;
  let channel: Channel;
  let store: Store;
  const name = "Daniel";
  const roomCode = "test-room-code";
  const initialPathname = getRoomPath(roomCode);

  beforeEach(() => {
    channel = new MockChannel();
    store = createStore(() => channel);
    history = createMemoryHistory({ initialEntries: [initialPathname] });
  });

  describe("with a name set", () => {
    beforeEach(() => {
      store.dispatch(setName(name));
      render(<GameRoomView roomCode={roomCode} />, {
        wrapper: createTestProviders({ channel, store, history }),
      });
    });

    it("enters the channel with my id and name", async () => {
      const id = selectId(store.getState());
      await waitFor(() => {
        expect(channel.presence.enterClient).toHaveBeenCalledWith(id, { name });
      });
    });
  });

  describe("without a name set", () => {
    beforeEach(() => {
      render(<GameRoomView roomCode={roomCode} />, {
        wrapper: createTestProviders({ channel, store, history }),
      });
    });

    it("redirects to the main page", () => {
      expect(history.location.pathname).toBe("/");
    });

    it("keeps the roomCode in the search", () => {
      expect(history.location.search).toContain(`roomCode=${roomCode}`);
    });
  });
});
