import React from "react";
import { MainView } from "./views/MainView/MainView";
import "fontsource-roboto";
import { Route, Switch } from "./services/router";
import { getRoomPath } from "./views/WaitingRoomView/getRoomPath";
import { getMainPath } from "./views/MainView/getMainPath";
import { GameRoomNameGuard } from "./views/GameRoomView/GameRoomNameGuard";

export function App() {
  return (
    <Switch>
      <Route path={getRoomPath(":roomCode")}>
        {({ match }) => (
          <GameRoomNameGuard roomCode={match!.params.roomCode!} />
        )}
      </Route>
      <Route path={getMainPath()}>
        <MainView />
      </Route>
    </Switch>
  );
}
