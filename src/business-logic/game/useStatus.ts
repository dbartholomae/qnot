import { useSelector } from "../useSelector";
import { selectStatus } from "./gameSlice";

export function useStatus() {
  return useSelector(selectStatus);
}
