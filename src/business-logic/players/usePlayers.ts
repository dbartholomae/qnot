import { selectPlayers } from "./playersSlice";
import { useSelector } from "../useSelector";

export function usePlayers() {
  return useSelector(selectPlayers);
}
