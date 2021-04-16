import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen, waitFor } from "@testing-library/react";
import { createStore, Store } from "../store/store";
import React from "react";
import { RoomView } from "./RoomView";
import { getRoomPath } from "./getRoomPath";
import { createTestProviders } from "../testUtils/createTestProviders";
import { en } from "../locale";
import userEvent from "@testing-library/user-event";
import { Channel } from "../channel/Channel";
import { MockChannel } from "../channel/MockChannel";
import { Player } from "../players";
import { addOrUpdatePlayer } from "../players/playersSlice";
import { selectId, setName } from "../me/meSlice";

const locale = en.RoomView;

describe("RoomView", () => {
  let channel: Channel;
  let history: MemoryHistory;
  let store: Store;
  const roomCode = "test-room-code";
  const initialPathname = getRoomPath(roomCode);

  describe("with a name set", () => {
    const myName = "Daniel";

    beforeEach(() => {
      channel = new MockChannel();
      history = createMemoryHistory({ initialEntries: [initialPathname] });
      store = createStore();
      store.dispatch(setName(myName));
      render(<RoomView roomCode={roomCode} />, {
        wrapper: createTestProviders({ channel, history, store }),
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
        store = createStore();
        store.dispatch(setName(myName));
        store.dispatch(
          addOrUpdatePlayer(
            new Player({ name: otherPlayerName, isOnline: false })
          )
        );
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

    it("enters the channel with my id and name", async () => {
      const name = "Daniel";
      store.dispatch(setName(name));
      const id = selectId(store.getState());
      await waitFor(() => {
        expect(channel.presence.enterClient).toHaveBeenCalledWith(id, { name });
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
