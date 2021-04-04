import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Wifi } from "@material-ui/icons";
import { en } from "../locale";
import React, { FunctionComponent } from "react";

interface Props {
  name: string;
}

export const PlayerListItem: FunctionComponent<Props> = ({ name }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Wifi aria-label={en.RoomView.online} />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};
