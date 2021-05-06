import React, { FunctionComponent } from "react";
import { Container, Typography } from "@material-ui/core";
import { MyWord } from "./MyWord";
import { Status, useStatus } from "../../business-logic/game";
import { AddFirstDescription, AddSecondDescription } from "./AddDescription";
import { AddFirstGuess, AddSecondGuess } from "./AddGuess";
import { RoundSummary } from "./RoundSummary";

export const GameRoomView: FunctionComponent = () => {
  const status = useStatus();
  const componentByStatus = {
    [Status.WaitingForGameStart]: () => null,
    [Status.ChoosingFirstDescription]: AddFirstDescription,
    [Status.GuessingFirstTeam]: AddFirstGuess,
    [Status.ChoosingSecondDescription]: AddSecondDescription,
    [Status.GuessingSecondTeam]: AddSecondGuess,
    [Status.GameOver]: RoundSummary,
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
