import React, { FunctionComponent } from "react";
import { Player } from "../../../business-logic/game";
import { Card, CardContent, Typography } from "@material-ui/core";

export interface Props {
  player: Player & { pointChange: number };
  players: Pick<Player, "id" | "name">[];
}

export const PlayerSummary: FunctionComponent<Props> = ({
  player,
  players,
}) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h3">
        {player.name}
      </Typography>
      <dl>
        <dt>Wort</dt>
        <dd>{player.word === null ? "Fragezeichen" : player.word}</dd>

        <dt>Beschreibungen</dt>
        <dd>{player.descriptions.join(", ")}</dd>

        <dt>Erste Vermutung</dt>
        <dd>
          {player.guesses[0]
            .map((id) => players.find((player) => player.id === id)!.name)
            .join(", ")}
        </dd>

        <dt>Zweite Vermutung</dt>
        <dd>
          {player.guesses[1]
            .map((id) => players.find((player) => player.id === id)!.name)
            .join(", ")}
        </dd>

        <dt>Punkte</dt>
        <dd>
          {player.points} ({player.pointChange > 0 ? "+" : ""}
          {player.pointChange})
        </dd>
      </dl>
    </CardContent>
  </Card>
);
