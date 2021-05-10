import React, { FunctionComponent } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { en } from "../../services/locale";
import { usePlayers } from "../../business-logic/players";
import { addOrUpdatePlayer } from "../../business-logic/players/playersSlice";
import { getInvitePath } from "../JoinRoomView/getInvitePath";
import { convertPathToUrl } from "./convertPathToUrl";
import { useDispatch } from "../../business-logic/useDispatch";
import { MockPlayer } from "../../business-logic/game";
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
      <PlayerList players={players} />
      {isHost && (
        <Button onClick={startGame}>{en.WaitingRoomView.startGame}</Button>
      )}
      <Button onClick={() => dispatch(addOrUpdatePlayer(new MockPlayer()))}>
        Add mock player
      </Button>
    </Container>
  );
};
