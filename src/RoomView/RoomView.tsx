import React from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getMainPath } from "../MainView/getMainPath";
import { Wifi } from "@material-ui/icons";
import { en } from "../locale";
import { useName } from "../name";

interface Props {
  roomCode: string;
}

export function RoomView({ roomCode }: Props) {
  const [myName] = useName();
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
            text={`${process.env.PUBLIC_URL}${getMainPath(roomCode)}`}
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
          <ListItem>
            <ListItemIcon>
              <Wifi aria-label={en.RoomView.online} />
            </ListItemIcon>
            <ListItemText primary={myName} />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}
