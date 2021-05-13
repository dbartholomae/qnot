import { createMemoryHistory, MemoryHistory } from "history";
import { render } from "@testing-library/react";
import { GameRoomNameGuard } from "./GameRoomNameGuard";
import { createTestProviders } from "../../testUtils/createTestProviders";
import React from "react";
import { getRoomPath } from "./getRoomPath";

describe("GameRoomView", () => {
  let history: MemoryHistory;
  const roomCode = "test-room-code";
  const initialPathname = getRoomPath(roomCode);

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: [initialPathname] });
    render(<GameRoomNameGuard roomCode={roomCode} />, {
      wrapper: createTestProviders({ history }),
    });
  });

  describe("without a name set", () => {
    it("redirects to the main page", () => {
      expect(history.location.pathname).toBe("/");
    });

    it("keeps the roomCode in the search", () => {
      expect(history.location.search).toContain(`roomCode=${roomCode}`);
    });
  });
});
