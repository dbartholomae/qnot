import React, { FunctionComponent } from "react";
import { Status, useStatus } from "../../business-logic/game";
import {
  AddFirstDescriptionView,
  AddSecondDescriptionView,
} from "./AddDescriptionView";
import { AddFirstGuessView, AddSecondGuessView } from "./AddGuessView";
import { RoundSummaryView } from "./RoundSummaryView";
import { WaitingRoomView } from "../WaitingRoomView/WaitingRoomView";

interface Props {
  roomCode: string;
}

export const GameRoomView: FunctionComponent<Props> = ({ roomCode }: Props) => {
  const status = useStatus();

  switch (status) {
    case Status.WaitingForGameStart:
      return <WaitingRoomView roomCode={roomCode} />;
    case Status.ChoosingFirstDescription:
      return <AddFirstDescriptionView />;
    case Status.GuessingFirstTeam:
      return <AddFirstGuessView />;
    case Status.ChoosingSecondDescription:
      return <AddSecondDescriptionView />;
    case Status.GuessingSecondTeam:
      return <AddSecondGuessView />;
    case Status.GameOver:
      return <RoundSummaryView />;
  }
};
