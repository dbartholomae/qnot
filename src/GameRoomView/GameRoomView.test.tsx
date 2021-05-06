import React from "react";
import { createTestProviders } from "../testUtils/createTestProviders";
import { render, screen } from "@testing-library/react";
import { createStore, Store } from "../store/store";
import { en } from "../locale";
import { GameRoomView } from "./GameRoomView";
import { selectMyWord, startGame } from "../game/gameSlice";
import { MockPlayer, Player } from "../game";
import { selectId } from "../me/meSlice";

describe("GameRoomView", () => {
  let store: Store;

  beforeEach(() => {
    store = createStore();
  });

  describe("with me having a word", () => {
    beforeEach(() => {
      store.dispatch(
        startGame({
          players: [
            new Player({
              id: selectId(store.getState()),
              name: "Daniel",
              isOnline: true,
            }),
            new MockPlayer(),
            new MockPlayer(),
          ],
          seed: "seed2",
          wordList: ["foo", "bar", "baz"],
        })
      );
    });

    it("shows my word", async () => {
      render(<GameRoomView />, { wrapper: createTestProviders({ store }) });
      const myWord = selectMyWord(store.getState());
      expect(
        await screen.findByLabelText(en.GameRoomView.myWordLabel)
      ).toContainHTML(myWord!);
    });

    it("asks me for a description", async () => {
      render(<GameRoomView />, { wrapper: createTestProviders({ store }) });
      expect(
        await screen.findByLabelText(en.GameRoomView.describeYourWord)
      ).toBeInTheDocument();
    });
  });

  describe("with me being a question mark", () => {
    beforeEach(() => {
      store.dispatch(
        startGame({
          players: [
            new Player({
              id: selectId(store.getState()),
              name: "Daniel",
              isOnline: true,
            }),
            new MockPlayer(),
            new MockPlayer(),
          ],
          seed: "seed",
          wordList: ["foo", "bar", "baz"],
        })
      );
    });

    it("shows I'm a question mark", async () => {
      render(<GameRoomView />, { wrapper: createTestProviders({ store }) });
      expect(
        await screen.findByText(en.GameRoomView.youReTheQuestionMark)
      ).toBeInTheDocument();
    });
  });
});
