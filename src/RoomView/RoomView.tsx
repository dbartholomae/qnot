import React, { useEffect, useState } from "react";
import { Redirect } from "../router";
import {
  Button,
  Container,
  Grid,
  List,
  ListSubheader,
  Paper,
  Typography,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getMainPath } from "../MainView/getMainPath";
import { en } from "../locale";
import { useName } from "../me";
import { PlayerListItem } from "./PlayerListItem";
import { Player, usePlayers } from "../otherPlayers";
import { getInvitePath } from "../JoinRoomView/getInvitePath";
import { useChannelCreator } from "../channel/useChannelCreator";
import { useId } from "../me/useId";
import { useConnectionToChannel } from "../otherPlayers/useConnectionToChannel";

interface Props {
  roomCode: string;
}

export function RoomView({ roomCode }: Props) {
  const myId = useId();
  const [myName] = useName();
  const otherPlayers = usePlayers();
  const channelCreator = useChannelCreator();
  const [channel] = useState(() => channelCreator(roomCode));
  useConnectionToChannel(channel);
  useEffect(() => {
    channel.publish("joinRoom", { id: myId, name: myName });
  }, [channel, myId, myName]);
  if (myName === null) {
    return <Redirect to={getMainPath(roomCode)} />;
  }
  const players = [new Player({ name: myName, isOnline: true })].concat(
    otherPlayers
  );

  return (
    <Container>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Room
          </Typography>
        </Grid>
        <Grid item>
          <CopyToClipboard
            text={`${process.env.PUBLIC_URL}${getInvitePath(roomCode)}`}
          >
            <Button variant="contained" color="primary">
              {en.RoomView.copyInviteLink}
            </Button>
          </CopyToClipboard>
        </Grid>
      </Grid>
      <Paper>
        <List
          subheader={
            <ListSubheader>{en.RoomView.playersListHeader}</ListSubheader>
          }
        >
          {players.map((player) => (
            <PlayerListItem key={player.name} player={player} isHost />
          ))}
        </List>
      </Paper>
    </Container>
  );
}
