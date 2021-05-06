import { useName } from "../../business-logic/me";
import { useSelector } from "../../business-logic/useSelector";
import { selectIsHost } from "../../business-logic/roomSettings";
import { Redirect } from "../../services/router";
import { getMainPath } from "../MainView/getMainPath";
import { getInvitePath } from "../JoinRoomView/getInvitePath";
import React from "react";
import { WaitingRoomView } from "./WaitingRoomView";

interface Props {
  roomCode: string;
}

export function WaitingRoomNameGuard({ roomCode }: Props) {
  const [myName] = useName();
  const isHost = useSelector(selectIsHost);

  if (myName === null) {
    if (isHost) {
      return <Redirect to={getMainPath(roomCode)} />;
    } else {
      return <Redirect to={getInvitePath(roomCode)} />;
    }
  }

  return <WaitingRoomView roomCode={roomCode} />;
}
