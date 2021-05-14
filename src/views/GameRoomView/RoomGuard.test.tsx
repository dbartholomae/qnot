import { render, screen } from "@testing-library/react";
import React from "react";
import { RoomGuard } from "./RoomGuard";
import { createTestProviders } from "../../testUtils/createTestProviders";
import { createStore, Store } from "../../business-logic/store";
import { Channel } from "../../services/channel/Channel";
import { MockChannel } from "../../services/channel/MockChannel";
import { mocked } from "../../testUtils/mocked";

describe("RoomGuard", () => {
  const roomCode = "a-room-code";
  let store: Store;
  let channel: Channel;

  beforeEach(() => {
    channel = new MockChannel();
    store = createStore(() => channel);
  });

  describe("while connecting", () => {
    beforeEach(() => {
      mocked(channel.presence.enterClient).mockReturnValue(
        new Promise(() => null)
      );
    });

    it("does not show its children", async () => {
      render(<RoomGuard roomCode={roomCode}>The room</RoomGuard>, {
        wrapper: createTestProviders({ channel, store }),
      });
      expect(screen.queryByText("The room")).not.toBeInTheDocument();
    });
  });

  describe("after connecting", () => {
    it("shows its children", async () => {
      render(<RoomGuard roomCode={roomCode}>The room</RoomGuard>, {
        wrapper: createTestProviders({ channel, store }),
      });

      expect(await screen.findByText("The room")).toBeInTheDocument();
    });
  });
});
