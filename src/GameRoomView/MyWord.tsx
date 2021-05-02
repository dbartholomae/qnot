import { useSelector } from "../store/useSelector";
import { selectMyWord } from "../game/gameSlice";
import { Card, CardContent, Typography } from "@material-ui/core";
import { en } from "../locale";
import React from "react";

export function MyWord() {
  const myWord = useSelector(selectMyWord);

  const id = "my-word-label";
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom id={id}>
          {en.GameRoomView.myWordLabel}
        </Typography>
        <Typography aria-labelledby={id}>
          {myWord ?? en.GameRoomView.youReTheQuestionMark}
        </Typography>
      </CardContent>
    </Card>
  );
}
