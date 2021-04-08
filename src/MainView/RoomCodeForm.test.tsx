import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory, MemoryHistory } from "history";
import { en } from "../locale";
import { getRoomPath } from "../RoomView/getRoomPath";
import { createTestProviders } from "../testUtils/createTestProviders";
import { RoomCodeForm } from "./RoomCodeForm";

const locale = en.MainView;

describe("RoomCodeForm", () => {
  let history: MemoryHistory;

  describe("on the root path", () => {
    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: ["/"] });
      render(<RoomCodeForm />, { wrapper: createTestProviders({ history }) });
    });

    it("shows a random three-word room code on start", async () => {
      expect(
        ((await screen.findByLabelText(
          locale.roomCodeLabel
        )) as HTMLInputElement).value
      ).toMatch(/\w+-\w+-\w+/);
    });

    it("creates a new room code when pressing the reload room code button", async () => {
      const oldRoomCode = ((await screen.findByLabelText(
        locale.roomCodeLabel
      )) as HTMLInputElement).value;

      userEvent.click(screen.getByLabelText(locale.createNewRoomCode));

      expect(
        ((await screen.findByLabelText(
          en.MainView.roomCodeLabel
        )) as HTMLInputElement).value
      ).not.toBe(oldRoomCode);
    });

    it("redirects to the room page when joining a room", async () => {
      const roomCode = ((await screen.findByLabelText(
        locale.roomCodeLabel
      )) as HTMLInputElement).value;
      userEvent.click(await screen.findByText(locale.joinRoom));

      expect(history.location.pathname).toEqual(getRoomPath(roomCode));
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
