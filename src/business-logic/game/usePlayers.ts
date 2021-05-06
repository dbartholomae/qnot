import { useSelector } from "../useSelector";
import { selectPlayers } from "./gameSlice";
import { calculateMyPoints } from "./calculateMyPoints";

export function usePlayers() {
  const players = useSelector(selectPlayers);
  return players.map((player) => ({
    ...player,
    points: calculateMyPoints(player, players),
  }));
}
