import React from "react";
import { Container, Typography } from "@material-ui/core";
import { useSelector } from "../app/store";
import { selectName } from "../name/nameSlice";

interface Props {
  roomCode: string;
}

export function RoomView({ roomCode }: Props) {
  const myName = useSelector(selectName);
  return (
    <Container>
      <Typography variant="h3">Room</Typography>
      <Typography variant="body1">{roomCode}</Typography>
      <Typography variant="body1">{myName}</Typography>
    </Container>
  );
}
