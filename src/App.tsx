import React from "react";
import { MainView } from "./MainView/MainView";
import "fontsource-roboto";
import { Route, Switch } from "react-router-dom";

export function App() {
  return (
    <Switch>
      <Route path="/r/:roomCode">{() => <div>Room</div>}</Route>
      <Route path="/">
        <MainView />
      </Route>
    </Switch>
  );
}
