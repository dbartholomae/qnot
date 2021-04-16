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
import { usePlayers } from "../players";
import { getInvitePath } from "../JoinRoomView/getInvitePath";
import { useChannelCreator } from "../channel/useChannelCreator";
import { useId } from "../me/useId";
import { useConnectionToChannel } from "../players/useConnectionToChannel";
import { selectIsHost } from "../roomSettings";
import { useSelector } from "../store/useSelector";

interface Props {
  roomCode: string;
}

export function RoomView({ roomCode }: Props) {
  const myId = useId();
  const [myName] = useName();
  const players = usePlayers();
  const channelCreator = useChannelCreator();
  const [channel] = useState(() => channelCreator(roomCode));
  useConnectionToChannel(channel);
  useEffect(() => {
    channel.presence.enterClient(myId, { name: myName });
    return () => channel.presence.leaveClient(myId);
  }, [channel, myId, myName]);

  const isHost = useSelector(selectIsHost);

  if (myName === null) {
    if (isHost) {
      return <Redirect to={getMainPath(roomCode)} />;
    } else {
      return <Redirect to={getInvitePath(roomCode)} />;
    }
  }

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
