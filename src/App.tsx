import React from "react";
import { MainView } from "./views/MainView/MainView";
import "fontsource-roboto";
import { Route, Switch } from "./services/router";
import { getWaitingRoomPath } from "./views/WaitingRoomView/getWaitingRoomPath";
import { getMainPath } from "./views/MainView/getMainPath";
import { JoinRoomView } from "./views/JoinRoomView/JoinRoomView";
import { getInvitePath } from "./views/JoinRoomView/getInvitePath";
import { WaitingRoomNameGuard } from "./views/WaitingRoomView/WaitingRoomNameGuard";
import { getGameRoomPath } from "./views/GameRoomView/getGameRoomPath";
import { GameRoomView } from "./views/GameRoomView/GameRoomView";

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
