import { selectPlayers } from "./otherPlayersSlice";
import { useSelector } from "../store/useSelector";

export function usePlayers() {
  return useSelector(selectPlayers);
}
