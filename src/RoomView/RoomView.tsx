import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import { useSelector } from "../store/store";
import { selectName } from "../name/nameSlice";
import { getMainPath } from "../MainView/getMainPath";

interface Props {
  roomCode: string;
}

export function RoomView({ roomCode }: Props) {
  const myName = useSelector(selectName);
  if (myName === null) {
    return <Redirect to={getMainPath(roomCode)} />;
  }

  return (
    <Container>
      <Typography variant="h3">Room</Typography>
      <Typography variant="body1">{roomCode}</Typography>
      <Typography variant="body1">{myName}</Typography>
    </Container>
  );
}
