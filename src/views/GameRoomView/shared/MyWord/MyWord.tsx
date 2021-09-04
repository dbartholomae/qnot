import React from "react";
import { useMyWord } from "../../../../business-logic/game";
import { MyWordDisplay } from "./MyWordDisplay";

export function MyWord() {
  const myWord = useMyWord();

  return <MyWordDisplay myWord={myWord} />;
}
