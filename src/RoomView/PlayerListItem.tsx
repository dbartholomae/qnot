import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { Home, Wifi, WifiOff } from "@material-ui/icons";
import { en } from "../locale";
import React, { FunctionComponent } from "react";
import { Player } from "../players";

interface Props {
  isHost: boolean;
  player: Player;
}

export const PlayerListItem: FunctionComponent<Props> = ({
  player: { name, isOnline },
  isHost,
}) => {
  return (
    <ListItem>
      <ListItemIcon>
        {isOnline ? (
          <Wifi aria-label={en.RoomView.online} />
        ) : (
          <WifiOff aria-label={en.RoomView.offline} color="error" />
        )}
      </ListItemIcon>
      <ListItemText primary={name} />
      {isHost && (
        <ListItemSecondaryAction>
          <Tooltip title={en.RoomView.host}>
            <Home aria-label={en.RoomView.host} />
          </Tooltip>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};
