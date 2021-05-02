import React, { FunctionComponent } from "react";
import { Container, TextField, Typography } from "@material-ui/core";
import { en } from "../locale";
import { MyWord } from "./MyWord";

export const GameRoomView: FunctionComponent = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Game
      </Typography>
      <MyWord />
      <TextField id="description" label={en.GameRoomView.describeYourWord} />
    </Container>
  );
};
