import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Container, Typography } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { selectName } from "../name/nameSlice";
import { getMainPath } from "../MainView/getMainPath";
import { useSelector } from "../store/useSelector";
import { Wifi } from "@material-ui/icons";
import { en } from "../locale";

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
      <CopyToClipboard
        text={`${process.env.PUBLIC_URL}${getMainPath(roomCode)}`}
      >
        <Button variant="contained" color="primary">
          {en.RoomView.copyInviteLink}
        </Button>
      </CopyToClipboard>
      <Wifi aria-label={en.RoomView.online} />
      <Typography variant="body1">{myName}</Typography>
    </Container>
  );
}
