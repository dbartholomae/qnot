import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Wifi, WifiOff } from "@material-ui/icons";
import { en } from "../../../../services/locale";
import React, { FunctionComponent } from "react";
import { Player } from "../../../../business-logic/game";

interface Props {
  player: Player;
}

export const PlayerListItem: FunctionComponent<Props> = ({
  player: { descriptions, name, isOnline },
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
      <ListItemText
        primary={name}
        secondary={descriptions.length > 0 && descriptions.join(", ")}
      />
    </ListItem>
  );
};
