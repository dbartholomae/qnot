import React, { FunctionComponent } from "react";
import { usePlayers } from "../../business-logic/game";
import { Container, Typography } from "@material-ui/core";
import { MyWord } from "./MyWord";
import { en } from "../../services/locale";

export const RoundSummaryView: FunctionComponent = () => {
  const players = usePlayers();
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {en.GameRoomView.title}
      </Typography>
      <MyWord />
      {players.map((player) => (
        <pre key={player.id}>{JSON.stringify(player)}</pre>
      ))}
    </Container>
  );
};
