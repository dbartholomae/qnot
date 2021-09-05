import { render, screen } from "@testing-library/react";
import { en } from "../../../../services/locale";
import React from "react";
import { MyWordDisplay } from "./MyWordDisplay";

describe("MyWord", () => {
  describe("if I have a word", () => {
    const myWord = "foobar";
    it("shows my word", () => {
      render(<MyWordDisplay myWord={myWord} />);
      expect(screen.getByText(myWord)).toBeInTheDocument();
    });
  });

  describe("if I don't have a word", () => {
    it("shows my word", () => {
      render(<MyWordDisplay myWord={null} />);
      expect(
        screen.getByText(en.GameRoomView.youReTheQuestionMark)
      ).toBeInTheDocument();
    });
  });
});
