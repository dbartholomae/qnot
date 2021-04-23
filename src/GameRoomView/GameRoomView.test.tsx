import React from "react";
import { createTestProviders } from "../testUtils/createTestProviders";
import { render, screen } from "@testing-library/react";
import { createStore } from "../store/store";
import { selectMyWord, startGame } from "../game/gameSlice";
import { en } from "../locale";
import { GameRoomView } from "./GameRoomView";
import { Player } from "../game/Player";
import { selectId } from "../me/meSlice";
import { MockPlayer } from "../game/MockPlayer";

describe("GameRoomView", () => {
  it("shows my word", async () => {
    const store = createStore();
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
    render(<GameRoomView />, { wrapper: createTestProviders({ store }) });
    const myWord = selectMyWord(store.getState());
    expect(myWord).not.toBeNull();
    expect(
      await screen.findByLabelText(en.GameRoomView.myWordLabel)
    ).toContainHTML(myWord!);
  });

  it("shows I'm a question mark if I am", async () => {
    const store = createStore();
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
    render(<GameRoomView />, { wrapper: createTestProviders({ store }) });
    const myWord = selectMyWord(store.getState());
    expect(myWord).toBeNull();
    expect(
      await screen.findByText(en.GameRoomView.youReTheQuestionMark)
    ).toBeInTheDocument();
  });
});
