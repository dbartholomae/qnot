import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory, MemoryHistory } from "history";
import { en } from "../locale";
import { getRoomPath } from "../RoomView/getRoomPath";
import { createTestProviders } from "../testUtils/createTestProviders";
import { RoomCodeForm } from "./RoomCodeForm";
import { createStore, Store } from "../store/store";
import { selectIsHost } from "../roomSettings";

const locale = en.MainView;

async function getRoomCode() {
  return ((await screen.findByLabelText(
    locale.roomCodeLabel
  )) as HTMLInputElement).value;
}

describe("RoomCodeForm", () => {
  let history: MemoryHistory;
  let store: Store;

  describe("on the root path", () => {
    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: ["/"] });
      store = createStore();
      render(<RoomCodeForm />, {
        wrapper: createTestProviders({ history, store }),
      });
    });

    it("shows a random three-word room code on start", async () => {
      expect(await getRoomCode()).toMatch(/\w+-\w+-\w+/);
    });

    it("creates a new room code when pressing the reload room code button", async () => {
      const oldRoomCode = await getRoomCode();
      userEvent.click(screen.getByLabelText(locale.generateNewRoomCode));
      expect(await getRoomCode()).not.toBe(oldRoomCode);
    });

    it("does not allow to edit the room code", async () => {
      const oldRoomCode = await getRoomCode();
      await userEvent.type(
        await screen.findByLabelText(locale.roomCodeLabel),
        "somemorecharacters"
      );
      expect(await getRoomCode()).toBe(oldRoomCode);
    });

    it("redirects to the room page when creating a room", async () => {
      const roomCode = await getRoomCode();
      userEvent.click(await screen.findByText(locale.createRoom));

      expect(history.location.pathname).toEqual(getRoomPath(roomCode));
    });

    it("marks you as host when creating a room", async () => {
      userEvent.click(await screen.findByText(locale.createRoom));
      expect(selectIsHost(store.getState())).toBe(true);
    });
  });

  describe("on the root path with a room code in the search", () => {
    const roomCode = "a-room-code";

    beforeEach(() => {
      history = createMemoryHistory({
        initialEntries: [`/?roomCode=${roomCode}`],
      });
      render(<RoomCodeForm />, { wrapper: createTestProviders({ history }) });
    });

    it("loads the initial room name from the search", async () => {
      expect(
        ((await screen.findByLabelText(
          locale.roomCodeLabel
        )) as HTMLInputElement).value
      ).toBe(roomCode);
    });
  });
});
