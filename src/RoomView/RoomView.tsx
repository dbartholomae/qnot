import React from "react";
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
import { useName } from "../name";
import { PlayerListItem } from "./PlayerListItem";
import { usePlayers } from "../players";
import { getInvitePath } from "../JoinRoomView/getInvitePath";

interface Props {
  roomCode: string;
}

export function RoomView({ roomCode }: Props) {
  const [myName] = useName();
  const players = usePlayers();
  if (myName === null) {
    return <Redirect to={getMainPath(roomCode)} />;
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
