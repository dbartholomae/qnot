import React from "react";
import { Container, Typography } from "@material-ui/core";

interface Props {
  roomCode: string;
}

export function RoomView({ roomCode }: Props) {
  return (
    <Container>
      <Typography variant="h3">Room</Typography>
      <Typography variant="body1">{roomCode}</Typography>
    </Container>
  );
}
