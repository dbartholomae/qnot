import React from "react";
import { createTestProviders } from "../../../testUtils/createTestProviders";
import { render, screen } from "@testing-library/react";
import { createStore, Store } from "../../../business-logic/store";
import { en } from "../../../services/locale";
import {
  selectMyWord,
  startGame,
} from "../../../business-logic/game/gameSlice";
import { MockPlayer, Player } from "../../../business-logic/game";
import { selectId } from "../../../business-logic/me/meSlice";
import { AddDescriptionView } from "./AddDescriptionView";
import userEvent from "@testing-library/user-event";
import { MockChannel } from "../../../services/channel/MockChannel";

describe("AddDescriptionView", () => {
  let store: Store;

  beforeEach(() => {
    store = createStore(() => new MockChannel());
  });

  it("shows the descriptions of other players", async () => {
    const description = "a description";
    store.dispatch({
      type: startGame.type,
      payload: [
        new MockPlayer({
          descriptions: [description],
        }),
        new MockPlayer(),
        new MockPlayer(),
      ],
    });

    render(<AddDescriptionView onChoose={jest.fn()} />, {
      wrapper: createTestProviders({ store }),
    });

    expect(screen.getByText(description, { exact: false })).toBeInTheDocument();
  });

  describe("with me having a word", () => {
    beforeEach(() => {
      store.dispatch({
        type: startGame.type,
        payload: [
          new Player({
            id: selectId(store.getState()),
            name: "Daniel",
            word: "Test",
            isOnline: true,
          }),
          new MockPlayer({ word: null }),
          new MockPlayer({ word: "Test" }),
        ],
      });
    });

    it("shows my word", async () => {
      render(<AddDescriptionView onChoose={jest.fn()} />, {
        wrapper: createTestProviders({ store }),
      });
      const myWord = selectMyWord(store.getState());
      expect(
        await screen.findByLabelText(en.GameRoomView.myWordLabel)
      ).toContainHTML(myWord!);
    });

    it("allows me to choose a description", async () => {
      const onChoose = jest.fn();
      render(<AddDescriptionView onChoose={onChoose} />, {
        wrapper: createTestProviders({ store }),
      });
      const myDescription = "my description";
      userEvent.type(
        screen.getByLabelText(en.GameRoomView.describeYourWord),
        `${myDescription}{enter}`
      );
      expect(onChoose).toHaveBeenCalledWith(myDescription);
    });
  });

  describe("with me being a question mark", () => {
    beforeEach(() => {
      store.dispatch({
        type: startGame.type,
        payload: [
          new Player({
            id: selectId(store.getState()),
            name: "Daniel",
            word: null,
            isOnline: true,
          }),
          new MockPlayer(),
          new MockPlayer(),
        ],
      });
    });

    it("shows I'm a question mark", async () => {
      render(<AddDescriptionView onChoose={jest.fn()} />, {
        wrapper: createTestProviders({ store }),
      });
      expect(
        await screen.findByText(en.GameRoomView.youReTheQuestionMark)
      ).toBeInTheDocument();
    });
  });

  describe("after I entered a description", () => {
    beforeEach(() => {
      render(<AddDescriptionView onChoose={jest.fn()} />, {
        wrapper: createTestProviders({ store }),
      });
      const myDescription = "my description";
      userEvent.type(
        screen.getByLabelText(en.GameRoomView.describeYourWord),
        `${myDescription}{enter}`
      );
    });

    it("no longer allows me to edit my description", async () => {
      expect(
        screen.getByLabelText(en.GameRoomView.describeYourWord)
      ).toBeDisabled();
    });
  });
});
