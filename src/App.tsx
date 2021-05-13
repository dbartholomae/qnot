import React from "react";
import { MainView } from "./views/MainView/MainView";
import "fontsource-roboto";
import { Route, Switch } from "./services/router";
import { getRoomPath } from "./views/GameRoomView/getRoomPath";
import { getMainPath } from "./views/MainView/getMainPath";
import { GameRoomView } from "./views/GameRoomView/GameRoomView";

export function App() {
  return (
    <Switch>
      <Route path={getRoomPath(":roomCode")}>
        {({ match }) => <GameRoomView roomCode={match!.params.roomCode!} />}
      </Route>
      <Route path={getMainPath()}>
        <MainView />
      </Route>
    </Switch>
  );
}
