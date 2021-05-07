import React, { FunctionComponent } from "react";
import { Status, useStatus } from "../../business-logic/game";
import {
  AddFirstDescriptionView,
  AddSecondDescriptionView,
} from "./AddDescriptionView";
import { AddFirstGuessView, AddSecondGuessView } from "./AddGuessView";
import { RoundSummaryView } from "./RoundSummaryView";
import { getMainPath } from "../MainView/getMainPath";
import { Redirect } from "../../services/router";

export const GameRoomView: FunctionComponent = () => {
  const status = useStatus();

  switch (status) {
    case Status.WaitingForGameStart:
      return <Redirect to={getMainPath()} />;
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
