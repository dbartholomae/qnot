import React, { FunctionComponent } from "react";
import { Container, Typography } from "@material-ui/core";
import { MyWord } from "./MyWord";
import { useStatus } from "../game/useStatus";
import { Status } from "../game/gameSlice";
import { AddFirstDescription, AddSecondDescription } from "./AddDescription";
import { AddFirstGuess, AddSecondGuess } from "./AddGuess";

export const GameRoomView: FunctionComponent = () => {
  const status = useStatus();
  const componentByStatus: {
    [key in Status]: FunctionComponent;
  } = {
    [Status.ChoosingFirstDescription]: AddFirstDescription,
    [Status.ChoosingSecondDescription]: AddSecondDescription,
    [Status.GameOver]: () => null,
    [Status.GuessingFirstTeam]: AddFirstGuess,
    [Status.GuessingSecondTeam]: AddSecondGuess,
    [Status.WaitingForGameStart]: () => null,
  };
  const Component = componentByStatus[status];

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Game
      </Typography>
      <MyWord />
      <Component />
    </Container>
  );
};
