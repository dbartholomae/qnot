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
          <Wifi aria-label={en.WaitingRoomView.online} />
        ) : (
          <WifiOff aria-label={en.WaitingRoomView.offline} color="error" />
        )}
      </ListItemIcon>
      <ListItemText primary={name} />
      {isHost && (
        <ListItemSecondaryAction>
          <Tooltip title={en.WaitingRoomView.host}>
            <Home aria-label={en.WaitingRoomView.host} />
          </Tooltip>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};
