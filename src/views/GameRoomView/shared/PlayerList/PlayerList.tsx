import { Player } from "../../../../business-logic/game";
import { List, ListSubheader, Paper } from "@material-ui/core";
import { en } from "../../../../services/locale";
import { PlayerListItem } from "./PlayerListItem";
import React from "react";

export interface Props {
  players: Player[];
}

export function PlayerList({ players }: Props) {
  return (
    <Paper>
      <List
        subheader={
          <ListSubheader>{en.WaitingRoomView.playersListHeader}</ListSubheader>
        }
      >
        {players.map((player) => (
          <PlayerListItem key={player.name} player={player} />
        ))}
      </List>
    </Paper>
  );
}
