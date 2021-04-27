import React, { FunctionComponent } from "react";
import {
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { en } from "../locale";
import { useSelector } from "../store/useSelector";
import { selectMyWord } from "../game/gameSlice";

export const GameRoomView: FunctionComponent = () => {
  const myWordLabelId = "my-word-label";
  const myWord = useSelector(selectMyWord);
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Game
      </Typography>
      {myWord === null ? (
        en.GameRoomView.youReTheQuestionMark
      ) : (
        <Card>
          <CardContent>
            <Typography gutterBottom id={myWordLabelId}>
              {en.GameRoomView.myWordLabel}
            </Typography>
            <Typography aria-labelledby={myWordLabelId}>{myWord}</Typography>
          </CardContent>
        </Card>
      )}
      <TextField id="description" label={en.GameRoomView.describeYourWord} />
    </Container>
  );
};
