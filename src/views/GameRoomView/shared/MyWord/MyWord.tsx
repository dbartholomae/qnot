import { Card, CardContent, Typography } from "@material-ui/core";
import { en } from "../../../../services/locale";
import React from "react";
import { useMyWord } from "../../../../business-logic/game";

export function MyWord() {
  const myWord = useMyWord();

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
