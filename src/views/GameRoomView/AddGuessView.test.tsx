import { startGame } from "../../business-logic/game/gameSlice";
import { MockPlayer } from "../../business-logic/game";
import { render, screen } from "@testing-library/react";
import { createTestProviders } from "../../testUtils/createTestProviders";
import React from "react";
import { AddGuessView } from "./AddGuessView";
import { createStore, Store } from "../../business-logic/store";
import { MockChannel } from "../../services/channel/MockChannel";
import userEvent from "@testing-library/user-event";
import { en } from "../../services/locale";

describe("AddGuessView", () => {
  let store: Store;

  beforeEach(() => {
    store = createStore(() => new MockChannel());
  });

  it("shows the descriptions of other players", async () => {
    const description = "a description";
    store.dispatch(
      startGame({
        players: [
          new MockPlayer({
            descriptions: [description],
          }),
          new MockPlayer(),
          new MockPlayer(),
        ],
        wordList: ["foo", "bar", "baz"],
      })
    );

    render(<AddGuessView onChoose={jest.fn()} />, {
      wrapper: createTestProviders({ store }),
    });

    expect(screen.getByText(description, { exact: false })).toBeInTheDocument();
  });

  describe("after I made a guess", () => {
    beforeEach(() => {
      store.dispatch(
        startGame({
          players: [new MockPlayer(), new MockPlayer(), new MockPlayer()],
          wordList: ["foo", "bar", "baz"],
        })
      );

      render(<AddGuessView onChoose={jest.fn()} />, {
        wrapper: createTestProviders({ store }),
      });

      const playerListItems = screen.getAllByRole("checkbox");

      userEvent.click(playerListItems[0]);
      userEvent.click(playerListItems[1]);
      userEvent.click(screen.getByText(en.GameRoomView.guess));
    });

    it("no longer allows me to make a guess", async () => {
      expect(screen.getAllByRole("checkbox")[0]).toBeDisabled();
    });
  });
});
