import { useName } from "../../business-logic/me";
import { Redirect } from "../../services/router";
import { getMainPath } from "../MainView/getMainPath";
import React from "react";
import { GameRoomView } from "./GameRoomView";

interface Props {
  roomCode: string;
}

export function GameRoomNameGuard({ roomCode }: Props) {
  const [myName] = useName();

  if (myName === null) {
    return <Redirect to={getMainPath(roomCode)} />;
  }

  return <GameRoomView roomCode={roomCode} />;
}
