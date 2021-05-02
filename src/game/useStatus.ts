import { useSelector } from "../store/useSelector";
import { selectStatus } from "./gameSlice";

export function useStatus() {
  return useSelector(selectStatus);
}
