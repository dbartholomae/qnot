import { render, screen } from "@testing-library/react";
import { en } from "../locale";
import { createTestProviders } from "../testUtils/createTestProviders";
import React from "react";
import { JoinRoomView } from "./JoinRoomView";

const locale = en.MainView;

describe("JoinRoomView", () => {
  describe("without a name set", () => {
    beforeEach(() => {
      render(<JoinRoomView />, {
        wrapper: createTestProviders(),
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
});
