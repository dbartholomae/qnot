import { useSelector } from "../useSelector";
import { selectPlayers } from "./gameSlice";

export function usePlayers() {
  return useSelector(selectPlayers);
}
