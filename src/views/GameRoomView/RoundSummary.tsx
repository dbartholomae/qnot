import { FunctionComponent } from "react";
import { usePlayers } from "../../business-logic/game";

export const RoundSummary: FunctionComponent = () => {
  const players = usePlayers();
  return (
    <div>
      {players.map((player) => (
        <pre key={player.id}>{JSON.stringify(player)}</pre>
      ))}
    </div>
  );
};
