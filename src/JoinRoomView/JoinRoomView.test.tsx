import { render, screen } from "@testing-library/react";
import { en } from "../locale";
import { createTestProviders } from "../testUtils/createTestProviders";
import React from "react";
import { JoinRoomView } from "./JoinRoomView";
import { createStore } from "../store/store";

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

  describe("with a name set", () => {
    beforeEach(() => {
      render(<JoinRoomView />, {
        wrapper: createTestProviders({
          store: createStore({ preloadedState: { name: "Daniel" } }),
        }),
      });
    });

    it("shows the Join button", async () => {
      expect(screen.getByText(en.JoinRoomView.joinGame)).toBeInTheDocument();
    });
  });
});
