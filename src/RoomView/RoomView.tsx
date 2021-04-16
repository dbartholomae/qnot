import React, { FunctionComponent, useEffect, useState } from "react";
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
import { en } from "../locale";
import { useName } from "../me";
import { PlayerListItem } from "./PlayerListItem";
import { usePlayers } from "../players";
import { getInvitePath } from "../JoinRoomView/getInvitePath";
import { useChannelCreator } from "../channel/useChannelCreator";
import { useId } from "../me/useId";
import { useConnectionToChannel } from "../players/useConnectionToChannel";
import { convertPathToUrl } from "./convertPathToUrl";

interface Props {
  roomCode: string;
}

export const RoomView: FunctionComponent<Props> = ({ roomCode }) => {
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

  return (
    <Container>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Room
          </Typography>
        </Grid>
        <Grid item>
          <CopyToClipboard text={convertPathToUrl(getInvitePath(roomCode))}>
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
};
