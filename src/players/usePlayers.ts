import { selectPlayers } from "./playersSlice";
import { useSelector } from "../store/useSelector";

export function usePlayers() {
  return useSelector(selectPlayers);
}
