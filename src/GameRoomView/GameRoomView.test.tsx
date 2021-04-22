import React from "react";
import { createTestProviders } from "../testUtils/createTestProviders";
import { render, screen } from "@testing-library/react";
import { createStore } from "../store/store";
import { selectMyWord, startNewRound } from "../game/gameSlice";
import { en } from "../locale";
import { GameRoomView } from "./GameRoomView";

describe("GameRoomView", () => {
  it("shows my word", async () => {
    const store = createStore();
    store.dispatch(startNewRound());
    render(<GameRoomView />, { wrapper: createTestProviders({ store }) });
    const myWord = selectMyWord(store.getState());
    expect(
      await screen.findByLabelText(en.GameRoomView.myWordLabel)
    ).toContainHTML(myWord!);
  });
});
