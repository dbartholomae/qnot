import React, { FunctionComponent } from "react";
import { usePlayers } from "../../../business-logic/game";
import { MyWord } from "../shared/MyWord/MyWord";
import { en } from "../../../services/locale";
import { Page } from "../../../components/Page";
import { PlayerSummary } from "./PlayerSummary";
import { Button } from "@material-ui/core";
import { useDispatch } from "../../../business-logic/useDispatch";
import { startNewRound } from "../../../business-logic/game/gameSlice";
import words from "../../../wordLists/german.json";
import { useId } from "../../../business-logic/me/useId";

export const RoundSummaryView: FunctionComponent = () => {
  const players = usePlayers();
  const myId = useId();
  const dispatch = useDispatch();
  const startNextRound = () => dispatch(startNewRound(players, words));
  return (
    <Page title={en.GameRoomView.title}>
      <MyWord />
      {players.map((player) => (
        <PlayerSummary
          player={player}
          players={players}
          isMe={player.id === myId}
        />
      ))}

      <Button variant="contained" color="primary" onClick={startNextRound}>
        Nächste Runde
      </Button>
    </Page>
  );
};
