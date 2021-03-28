import React from "react";
import { MainView } from "./MainView/MainView";
import "fontsource-roboto";
import { Route, Switch } from "react-router-dom";

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
      <Route path="/r/:roomCode">
        {({ match }) => <RoomView roomCode={match!.params.roomCode} />}
      </Route>
      <Route path="/">
        <MainView />
      </Route>
    </Switch>
  );
}
