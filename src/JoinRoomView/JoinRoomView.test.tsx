import { render, screen } from "@testing-library/react";
import { en } from "../locale";
import { createTestProviders } from "../testUtils/createTestProviders";
import React from "react";
import { JoinRoomView } from "./JoinRoomView";
import { createStore } from "../store/store";
import userEvent from "@testing-library/user-event";
import { getRoomPath } from "../RoomView/getRoomPath";
import { createMemoryHistory, MemoryHistory } from "history";
import { getInvitePath } from "./getInvitePath";

const locale = en.MainView;

describe("JoinRoomView", () => {
  let history: MemoryHistory;
  const roomCode = "a-room-code";
  const initialPathname = getInvitePath(roomCode);

  describe("without a name set", () => {
    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [initialPathname] });
      render(<JoinRoomView roomCode={roomCode} />, {
        wrapper: createTestProviders({ history }),
      });
    });

    it("allows you to set your name", async () => {
      expect(
        await screen.findByLabelText(locale.nameLabel)
      ).toBeInTheDocument();
    });

    it("does not show the Join button", async () => {
      expect(
        screen.queryByText(en.JoinRoomView.joinGame)
      ).not.toBeInTheDocument();
    });
  });

  describe("with a name set", () => {
    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [initialPathname] });
      render(<JoinRoomView roomCode={roomCode} />, {
        wrapper: createTestProviders({
          history,
          store: createStore({ preloadedState: { name: "Daniel" } }),
        }),
      });
    });

    it("redirects to the invited room when clicking the join button", async () => {
      userEvent.click(screen.getByText(en.JoinRoomView.joinGame));
      expect(history.location.pathname).toBe(getRoomPath(roomCode));
    });
  });
});
