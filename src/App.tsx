import React from "react";
import { MainView } from "./MainView/MainView";
import "fontsource-roboto";
import { Route, Switch } from "./router";
import { getWaitingRoomPath } from "./WaitingRoomView/getWaitingRoomPath";
import { getMainPath } from "./MainView/getMainPath";
import { JoinRoomView } from "./JoinRoomView/JoinRoomView";
import { getInvitePath } from "./JoinRoomView/getInvitePath";
import { WaitingRoomNameGuard } from "./WaitingRoomView/WaitingRoomNameGuard";
import { getGameRoomPath } from "./GameRoomView/getGameRoomPath";
import { GameRoomView } from "./GameRoomView/GameRoomView";

export function App() {
  return (
    <Switch>
      <Route path={getWaitingRoomPath(":roomCode")}>
        {({ match }) => (
          <WaitingRoomNameGuard roomCode={match!.params.roomCode!} />
        )}
      </Route>
      <Route path={getInvitePath(":roomCode")}>
        {({ match }) => <JoinRoomView roomCode={match!.params.roomCode!} />}
      </Route>
      <Route path={getGameRoomPath(":roomCode")}>
        <GameRoomView />
      </Route>
      <Route path={getMainPath()}>
        <MainView />
      </Route>
    </Switch>
  );
}
