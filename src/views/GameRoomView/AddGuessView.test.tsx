import { startGame } from "../../business-logic/game/gameSlice";
import { MockPlayer } from "../../business-logic/game";
import { render, screen } from "@testing-library/react";
import { createTestProviders } from "../../testUtils/createTestProviders";
import React from "react";
import { AddGuessView } from "./AddGuessView";
import { createStore, Store } from "../../business-logic/store";
import { MockChannel } from "../../services/channel/MockChannel";

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
        seed: "seed2",
        wordList: ["foo", "bar", "baz"],
      })
    );

    render(<AddGuessView onChoose={jest.fn()} />, {
      wrapper: createTestProviders({ store }),
    });

    expect(screen.getByText(description, { exact: false })).toBeInTheDocument();
  });
});
