import React, { FunctionComponent } from "react";
import { usePlayers } from "../../business-logic/game";
import { MyWord } from "./MyWord";
import { en } from "../../services/locale";
import { Page } from "../../components/Page";

export const RoundSummaryView: FunctionComponent = () => {
  const players = usePlayers();
  return (
    <Page title={en.GameRoomView.title}>
      <MyWord />
      {players.map((player) => (
        <pre key={player.id}>{JSON.stringify(player)}</pre>
      ))}
    </Page>
  );
};
