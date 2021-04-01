import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Button, Container, Typography } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { selectName } from "../name/nameSlice";
import { getMainPath } from "../MainView/getMainPath";
import { useSelector } from "../store/useSelector";
import { Wifi } from "@material-ui/icons";
import { en } from "../locale";
import { getRoomPath } from "./getRoomPath";

interface Props {
  roomCode: string;
}

function useHomepage() {
  const { pathname: inAppPathname } = useLocation();
  const { protocol, host, pathname: fullPathname } = window.location;
  return `${protocol}//${host}${fullPathname.slice(
    0,
    fullPathname.length - inAppPathname.length
  )}`;
}

export function RoomView({ roomCode }: Props) {
  const homepage = useHomepage();
  const myName = useSelector(selectName);
  if (myName === null) {
    return <Redirect to={getMainPath(roomCode)} />;
  }

  return (
    <Container>
      <Typography variant="h3">Room</Typography>
      <CopyToClipboard text={`${homepage}${getRoomPath(roomCode)}`}>
        <Button variant="contained" color="primary">
          {en.RoomView.copyInviteLink}
        </Button>
      </CopyToClipboard>
      <Typography variant="body1">{roomCode}</Typography>
      <Wifi aria-label={en.RoomView.online} />
      <Typography variant="body1">{myName}</Typography>
    </Container>
  );
}
