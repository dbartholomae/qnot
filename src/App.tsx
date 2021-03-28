import React from "react";
import { MainView } from "./MainView/MainView";
import "fontsource-roboto";
import { Route, Switch } from "react-router-dom";
import { getRoomPath } from "./Room/getRoomPath";

function RoomView({ roomCode }: { roomCode: string }) {
  return (
    <>
      <div>Room</div>
      <div>{roomCode}</div>
    </>
  );
}

export function App() {
  return (
    <Switch>
      <Route path={getRoomPath(":roomCode")}>
        {({ match }) => <RoomView roomCode={match!.params.roomCode} />}
      </Route>
      <Route path="/">
        <MainView />
      </Route>
    </Switch>
  );
}
