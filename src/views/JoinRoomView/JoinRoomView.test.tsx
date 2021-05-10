import { render, screen } from "@testing-library/react";
import { en } from "../../services/locale";
import { createTestProviders } from "../../testUtils/createTestProviders";
import React from "react";
import { JoinRoomView } from "./JoinRoomView";
import { createStore, Store } from "../../business-logic/store";
import userEvent from "@testing-library/user-event";
import { getRoomPath } from "../WaitingRoomView/getRoomPath";
import { createMemoryHistory, MemoryHistory } from "history";
import { getInvitePath } from "./getInvitePath";
import { selectIsHost } from "../../business-logic/roomSettings";
import { setName } from "../../business-logic/me/meSlice";

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
    const name = "Daniel";
    let store: Store;

    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [initialPathname] });
      store = createStore();
      store.dispatch(setName(name));
      render(<JoinRoomView roomCode={roomCode} />, {
        wrapper: createTestProviders({
          history,
          store,
        }),
      });
    });

    it("redirects to the invited room when clicking the join button", async () => {
      userEvent.click(screen.getByText(en.JoinRoomView.joinGame));
      expect(history.location.pathname).toBe(getRoomPath(roomCode));
    });

    it("does not make you host when clicking the join button", async () => {
      userEvent.click(screen.getByText(en.JoinRoomView.joinGame));
      expect(selectIsHost(store.getState())).toBe(false);
    });
  });
});
