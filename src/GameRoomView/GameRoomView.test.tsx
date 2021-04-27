import React from "react";
import { createTestProviders } from "../testUtils/createTestProviders";
import { render, screen } from "@testing-library/react";
import { createStore, Store } from "../store/store";
import { selectMyWord, startGame } from "../game/gameSlice";
import { en } from "../locale";
import { GameRoomView } from "./GameRoomView";
import { Player } from "../game/Player";
import { selectId } from "../me/meSlice";
import { MockPlayer } from "../game/MockPlayer";

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
