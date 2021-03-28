import React from "react";
import { MainView } from "./MainView/MainView";
import "fontsource-roboto";
import { Route, Switch } from "react-router-dom";

function RoomView() {
  return <div>Room</div>;
}

export function App() {
  return (
    <Switch>
      <Route path="/r/:roomCode">{() => <RoomView />}</Route>
      <Route path="/">
        <MainView />
      </Route>
    </Switch>
  );
}
