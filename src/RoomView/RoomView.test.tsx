import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen, waitFor } from "@testing-library/react";
import { createStore, Store } from "../store/store";
import React from "react";
import { RoomView } from "./RoomView";
import { getRoomPath } from "./getRoomPath";
import { createTestProviders } from "../testUtils/createTestProviders";
import { en } from "../locale";
import userEvent from "@testing-library/user-event";
import { setHost } from "../roomSettings";
import { EventBus } from "../eventBus/EventBus";
import { MockEventBus } from "../eventBus/MockEventBus";

const locale = en.RoomView;

describe("RoomView", () => {
  let eventBus: EventBus;
  let history: MemoryHistory;
  let store: Store;
  const roomCode = "test-room-code";
  const initialPathname = getRoomPath(roomCode);

  describe("with a name set", () => {
    const myName = "Daniel";

    beforeEach(() => {
      eventBus = new MockEventBus();
      history = createMemoryHistory({ initialEntries: [initialPathname] });
      store = createStore({ preloadedState: { name: myName } });
      render(<RoomView roomCode={roomCode} />, {
        wrapper: createTestProviders({ eventBus, history, store }),
      });
    });

    it("copies the room link to my clipboard when clicking the copy invite link button", async () => {
      document.execCommand = jest.fn();
      userEvent.click(await screen.findByText(locale.copyInviteLink));
      expect(document.execCommand).toHaveBeenCalled();
    });

    it("shows my name", async () => {
      expect(await screen.findByText(myName)).toBeInTheDocument();
    });

    it("shows me as online", async () => {
      expect(await screen.findByLabelText(locale.online)).toBeInTheDocument();
    });

    it("shows me as host", async () => {
      expect(await screen.findByLabelText(locale.host)).toBeInTheDocument();
    });

    describe("with another player offline", () => {
      const otherPlayerName = "Jill";
      beforeEach(() => {
        history = createMemoryHistory({ initialEntries: [initialPathname] });
        store = createStore({
          preloadedState: {
            name: myName,
            players: [{ name: otherPlayerName, isOnline: false }],
          },
        });
        render(<RoomView roomCode={roomCode} />, {
          wrapper: createTestProviders({ history, store }),
        });
      });

      it("shows the player", async () => {
        expect(await screen.findByText(otherPlayerName)).toBeInTheDocument();
      });

      it("shows the player as offline", async () => {
        expect(
          await screen.findByLabelText(locale.offline)
        ).toBeInTheDocument();
      });
    });

    describe("as non-host", () => {
      beforeEach(() => {
        store.dispatch(setHost(false));
      });

      it("sends a joinRoom event", async () => {
        await waitFor(() => {
          expect(eventBus.publish).toHaveBeenCalled();
        });
      });
    });
  });

  describe("without a name set", () => {
    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [initialPathname] });
      store = createStore();
      render(<RoomView roomCode={roomCode} />, {
        wrapper: createTestProviders({ history, store }),
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
