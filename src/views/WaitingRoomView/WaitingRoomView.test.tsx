import { createMemoryHistory, MemoryHistory } from "history";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { createStore, Store } from "../../business-logic/store";
import React from "react";
import { getWaitingRoomPath } from "./getWaitingRoomPath";
import { createTestProviders } from "../../testUtils/createTestProviders";
import { en } from "../../services/locale";
import userEvent from "@testing-library/user-event";
import { Channel } from "../../services/channel/Channel";
import { MockChannel } from "../../services/channel/MockChannel";
import { addOrUpdatePlayer } from "../../business-logic/players/playersSlice";
import { selectId, setName } from "../../business-logic/me/meSlice";
import { setHost } from "../../business-logic/roomSettings";
import { getInvitePath } from "../JoinRoomView/getInvitePath";
import { WaitingRoomNameGuard } from "./WaitingRoomNameGuard";
import { selectStatus } from "../../business-logic/game/gameSlice";
import { Player, Status } from "../../business-logic/game";
import { getGameRoomPath } from "../GameRoomView/getGameRoomPath";

const locale = en.WaitingRoomView;

describe("WaitingRoomView", () => {
  let channel: Channel;
  let history: MemoryHistory;
  let store: Store;
  const roomCode = "test-room-code";
  const initialPathname = getWaitingRoomPath(roomCode);

  describe("with a name set", () => {
    const myName = "Daniel";

    beforeEach(() => {
      channel = new MockChannel();
      history = createMemoryHistory({ initialEntries: [initialPathname] });
      store = createStore();
      store.dispatch(setName(myName));
      render(<WaitingRoomNameGuard roomCode={roomCode} />, {
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

    describe("as a host", () => {
      it("starts a game when I click the start game button", async () => {
        userEvent.click(
          await screen.findByRole("button", { name: locale.startGame })
        );

        expect(selectStatus(store.getState())).toBe(
          Status.ChoosingFirstDescription
        );
      });

      it("redirects to the game view when I start a game", async () => {
        userEvent.click(
          await screen.findByRole("button", { name: locale.startGame })
        );
        expect(history.location.pathname).toBe(getGameRoomPath(roomCode));
      });
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
        render(<WaitingRoomNameGuard roomCode={roomCode} />, {
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

    describe("when leaving the room", () => {
      beforeEach(() => {
        cleanup();
      });

      it("leaves the channel", async () => {
        const id = selectId(store.getState());
        await waitFor(() => {
          expect(channel.presence.leaveClient).toHaveBeenCalledWith(id);
        });
      });
    });
  });

  describe("without a name set", () => {
    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [initialPathname] });
      store = createStore();
    });

    describe("as a host", () => {
      beforeEach(() => {
        store.dispatch(setHost(true));
        render(<WaitingRoomNameGuard roomCode={roomCode} />, {
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

    describe("as a non-host", () => {
      beforeEach(() => {
        store.dispatch(setHost(false));
        render(<WaitingRoomNameGuard roomCode={roomCode} />, {
          wrapper: createTestProviders({ history, store }),
        });
      });

      it("redirects to the invite page", () => {
        expect(history.location.pathname).toBe(getInvitePath(roomCode));
      });
    });
  });
});
