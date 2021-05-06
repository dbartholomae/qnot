import { selectId } from "./meSlice";
import { useSelector } from "../useSelector";

export function useId() {
  return useSelector(selectId);
}
