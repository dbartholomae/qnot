import React, { FunctionComponent } from "react";
import { Status, useStatus } from "../../business-logic/game";
import {
  AddFirstDescriptionView,
  AddSecondDescriptionView,
} from "./AddDescriptionView/AddDescriptionView";
import {
  AddFirstGuessView,
  AddSecondGuessView,
} from "./AddGuessView/AddGuessView";
import { RoundSummaryView } from "./RoundSummaryView/RoundSummaryView";
import { WaitingRoomView } from "./WaitingRoomView/WaitingRoomView";
import { NameGuard } from "./NameGuard";
import { getMainPath } from "../MainView/getMainPath";
import { useRoom } from "./useRoom";

interface Props {
  roomCode: string;
}

export const GameRoomView: FunctionComponent<Props> = ({ roomCode }: Props) => {
  return (
    <NameGuard redirectPath={getMainPath(roomCode)}>
      <GameRoomRouter roomCode={roomCode} />
    </NameGuard>
  );
};

function GameRoomRouter({ roomCode }: Props) {
  useRoom(roomCode);
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
}
