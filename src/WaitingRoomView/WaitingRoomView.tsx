import React, { FunctionComponent } from "react";
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
import { PlayerListItem } from "./PlayerListItem";
import { usePlayers } from "../players";
import { addOrUpdatePlayer } from "../players/playersSlice";
import { getInvitePath } from "../JoinRoomView/getInvitePath";
import { convertPathToUrl } from "./convertPathToUrl";
import { useDispatch } from "../store/useDispatch";
import { MockPlayer } from "../game";
import { useRoom } from "./useRoom";
import { useStartGame } from "./useStartGame";

interface Props {
  roomCode: string;
}

export const WaitingRoomView: FunctionComponent<Props> = ({ roomCode }) => {
  useRoom(roomCode);
  const startGame = useStartGame(roomCode);

  const players = usePlayers();
  const dispatch = useDispatch();
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
              {en.WaitingRoomView.copyInviteLink}
            </Button>
          </CopyToClipboard>
        </Grid>
      </Grid>
      <Paper>
        <List
          subheader={
            <ListSubheader>
              {en.WaitingRoomView.playersListHeader}
            </ListSubheader>
          }
        >
          {players.map((player) => (
            <PlayerListItem key={player.name} player={player} isHost />
          ))}
        </List>
      </Paper>
      <Button onClick={startGame}>{en.WaitingRoomView.startGame}</Button>
      <Button onClick={() => dispatch(addOrUpdatePlayer(new MockPlayer()))}>
        Add mock player
      </Button>
    </Container>
  );
};
