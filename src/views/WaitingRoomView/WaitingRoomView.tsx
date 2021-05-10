import React, { FunctionComponent } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { en } from "../../services/locale";
import { usePlayers } from "../../business-logic/players";
import { getInvitePath } from "../JoinRoomView/getInvitePath";
import { convertPathToUrl } from "./convertPathToUrl";
import { useRoom } from "./useRoom";
import { useStartGame } from "./useStartGame";
import { selectIsHost } from "../../business-logic/roomSettings";
import { useSelector } from "../../business-logic/useSelector";
import { PlayerList } from "./PlayerList";

interface Props {
  roomCode: string;
}

export const WaitingRoomView: FunctionComponent<Props> = ({ roomCode }) => {
  useRoom(roomCode);
  const startGame = useStartGame();
  const isHost = useSelector(selectIsHost);

  const players = usePlayers();
  return (
    <Container>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {en.WaitingRoomView.title}
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
      <PlayerList players={players} />
      {isHost && (
        <Button onClick={startGame}>{en.WaitingRoomView.startGame}</Button>
      )}
    </Container>
  );
};
