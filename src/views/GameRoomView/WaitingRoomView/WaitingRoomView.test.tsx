import { render, screen } from "@testing-library/react";
import { createStore, Store } from "../../../business-logic/store";
import React from "react";
import { createTestProviders } from "../../../testUtils/createTestProviders";
import { en } from "../../../services/locale";
import userEvent from "@testing-library/user-event";
import { Channel } from "../../../services/channel/Channel";
import { MockChannel } from "../../../services/channel/MockChannel";
import { addOrUpdatePlayer } from "../../../business-logic/players/playersSlice";
import { setName } from "../../../business-logic/me/meSlice";
import { selectStatus } from "../../../business-logic/game/gameSlice";
import { Player, Status } from "../../../business-logic/game";
import { WaitingRoomView } from "./WaitingRoomView";

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
      render(<WaitingRoomView roomCode={roomCode} />, {
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
        render(<WaitingRoomView roomCode={roomCode} />, {
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
