import { render, screen } from "@testing-library/react";
import { MyWord } from "./MyWord";
import { useMyWord } from "../../business-logic/game";
import { mocked } from "../../testUtils/mocked";
import { en } from "../../services/locale";
import React from "react";

jest.mock("../../business-logic/game");

describe("MyWord", () => {
  describe("if I have a word", () => {
    const word = "foobar";
    beforeEach(() => {
      mocked(useMyWord).mockReturnValue(word);
    });

    it("shows my word", () => {
      render(<MyWord />);
      expect(screen.getByText(word)).toBeInTheDocument();
    });
  });

  describe("if I don't have a word", () => {
    beforeEach(() => {
      mocked(useMyWord).mockReturnValue(null);
    });

    it("shows my word", () => {
      render(<MyWord />);
      expect(
        screen.getByText(en.GameRoomView.youReTheQuestionMark)
      ).toBeInTheDocument();
    });
  });
});
