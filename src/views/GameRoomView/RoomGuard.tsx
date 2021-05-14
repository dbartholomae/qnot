import React, { ReactNode } from "react";
import { useRoom } from "./useRoom";
import { LinearProgress, Typography } from "@material-ui/core";
import { en } from "../../services/locale";
import { Page } from "../../components/Page";

interface Props {
  children?: ReactNode;
  roomCode: string;
}

export function RoomGuard({ children, roomCode }: Props) {
  const { connecting } = useRoom(roomCode);
  if (connecting)
    return (
      <Page>
        <LinearProgress />
        <Typography>{en.WaitingRoomView.connectingToRoom}</Typography>
      </Page>
    );
  return <>{children}</>;
}
