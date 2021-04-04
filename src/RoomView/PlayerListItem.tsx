import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Wifi, WifiOff } from "@material-ui/icons";
import { en } from "../locale";
import React, { FunctionComponent } from "react";
import { Player } from "../players";

interface Props {
  player: Player;
}

export const PlayerListItem: FunctionComponent<Props> = ({
  player: { name, isOnline },
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
    </ListItem>
  );
};