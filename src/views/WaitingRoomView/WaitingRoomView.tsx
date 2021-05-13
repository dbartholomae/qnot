import React, { FunctionComponent } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { en } from "../../services/locale";
import { usePlayers } from "../../business-logic/players";
import { convertPathToUrl } from "./convertPathToUrl";
import { useRoom } from "./useRoom";
import { useStartGame } from "./useStartGame";
import { PlayerList } from "./PlayerList";
import { Page } from "../../components/Page";
import { getRoomPath } from "./getRoomPath";

interface Props {
  roomCode: string;
}

export const WaitingRoomView: FunctionComponent<Props> = ({ roomCode }) => {
  useRoom(roomCode);
  const startGame = useStartGame();

  const players = usePlayers();
  return (
    <Page>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {en.WaitingRoomView.title}
          </Typography>
        </Grid>
        <Grid item>
          <CopyToClipboard text={convertPathToUrl(getRoomPath(roomCode))}>
            <Button variant="contained" color="primary">
              {en.WaitingRoomView.copyInviteLink}
            </Button>
          </CopyToClipboard>
        </Grid>
      </Grid>
      <PlayerList players={players} />
      <Button onClick={startGame} variant="contained" color="primary">
        {en.WaitingRoomView.startGame}
      </Button>
    </Page>
  );
};
