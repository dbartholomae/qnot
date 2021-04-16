import React from "react";
import { MainView } from "./MainView/MainView";
import "fontsource-roboto";
import { Route, Switch } from "./router";
import { getRoomPath } from "./RoomView/getRoomPath";
import { getMainPath } from "./MainView/getMainPath";
import { JoinRoomView } from "./JoinRoomView/JoinRoomView";
import { getInvitePath } from "./JoinRoomView/getInvitePath";
import { RoomNameGuard } from "./RoomView/RoomNameGuard";

export function App() {
  return (
    <Switch>
      <Route path={getRoomPath(":roomCode")}>
        {({ match }) => <RoomNameGuard roomCode={match!.params.roomCode!} />}
      </Route>
      <Route path={getInvitePath(":roomCode")}>
        {({ match }) => <JoinRoomView roomCode={match!.params.roomCode!} />}
      </Route>
      <Route path={getMainPath()}>
        <MainView />
      </Route>
    </Switch>
  );
}
