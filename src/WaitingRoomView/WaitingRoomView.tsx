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
import { GameRoomView } from "../GameRoomView/GameRoomView";
import { startGame } from "../game/gameSlice";
import { useDispatch } from "../store/useDispatch";

interface Props {
  roomCode: string;
}

export const WaitingRoomView: FunctionComponent<Props> = ({ roomCode }) => {
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
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const dispatch = useDispatch();
  function onStartGame() {
    dispatch(
      startGame({
        players,
        seed: "seed2",
        wordList: ["foo", "bar", "baz"],
      })
    );
    setGameIsRunning(true);
  }
  if (gameIsRunning) {
    return <GameRoomView />;
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
      <Button onClick={onStartGame}>{en.WaitingRoomView.startGame}</Button>
    </Container>
  );
};
