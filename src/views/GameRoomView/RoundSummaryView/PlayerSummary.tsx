import React, { FunctionComponent } from "react";
import { PlayerWithPoints } from "../../../business-logic/game";
import { Card, CardContent, Typography } from "@material-ui/core";

export interface Props {
  player: PlayerWithPoints;
  players: Pick<PlayerWithPoints, "id" | "name">[];
  isMe?: boolean;
}

export const PlayerSummary: FunctionComponent<Props> = ({
  player,
  players,
  isMe = false,
}) => (
  <Card>
    <CardContent>
      <Typography
        gutterBottom={!isMe}
        variant="h3"
        color={isMe ? "primary" : "initial"}
      >
        {player.name}
      </Typography>
      {isMe && (
        <Typography variant="subtitle1" gutterBottom>
          Das bist du
        </Typography>
      )}
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
