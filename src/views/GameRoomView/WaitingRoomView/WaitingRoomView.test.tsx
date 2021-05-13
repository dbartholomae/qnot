import { render, screen, waitFor } from "@testing-library/react";
import { createStore, Store } from "../../../business-logic/store";
import React from "react";
import { createTestProviders } from "../../../testUtils/createTestProviders";
import { en } from "../../../services/locale";
import userEvent from "@testing-library/user-event";
import { Channel } from "../../../services/channel/Channel";
import { MockChannel } from "../../../services/channel/MockChannel";
import { addOrUpdatePlayer } from "../../../business-logic/players/playersSlice";
import { selectId, setName } from "../../../business-logic/me/meSlice";
import { GameRoomNameGuard } from "../GameRoomNameGuard";
import { selectStatus } from "../../../business-logic/game/gameSlice";
import { Player, Status } from "../../../business-logic/game";

const locale = en.WaitingRoomView;

describe("WaitingRoomView", () => {
  let channel: Channel;
  let store: Store;
  const roomCode = "test-room-code";

  describe("with a name set", () => {
    const myName = "Daniel";

    beforeEach(() => {
      channel = new MockChannel();
      store = createStore(() => channel);
      store.dispatch(setName(myName));
      render(<GameRoomNameGuard roomCode={roomCode} />, {
        wrapper: createTestProviders({ channel, store }),
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

    describe("when I click the start game button", () => {
      beforeEach(() => {
        userEvent.click(screen.getByRole("button", { name: locale.startGame }));
      });

      it("starts a game", async () => {
        expect(selectStatus(store.getState())).toBe(
          Status.ChoosingFirstDescription
        );
      });

      it("shows the game view", async () => {
        expect(
          await screen.findByText(en.GameRoomView.title)
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

    describe("with another player offline", () => {
      const otherPlayerName = "Jill";
      beforeEach(() => {
        store = createStore(() => channel);
        store.dispatch(setName(myName));
        store.dispatch(
          addOrUpdatePlayer(
            new Player({ name: otherPlayerName, isOnline: false })
          )
        );
        render(<GameRoomNameGuard roomCode={roomCode} />, {
          wrapper: createTestProviders({ store }),
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
  });
});
