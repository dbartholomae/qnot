import React from "react";
import { createTestProviders } from "../../testUtils/createTestProviders";
import { render, screen } from "@testing-library/react";
import { createStore, Store } from "../../business-logic/store";
import { en } from "../../services/locale";
import { GameRoomView } from "./GameRoomView";
import { selectMyWord, startGame } from "../../business-logic/game/gameSlice";
import { MockPlayer, Player } from "../../business-logic/game";
import { selectId } from "../../business-logic/me/meSlice";
import { AddDescriptionView } from "./AddDescriptionView";
import userEvent from "@testing-library/user-event";

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
      render(<AddDescriptionView onChoose={jest.fn()} />, {
        wrapper: createTestProviders({ store }),
      });
      expect(
        await screen.findByText(en.GameRoomView.youReTheQuestionMark)
      ).toBeInTheDocument();
    });
  });
});
