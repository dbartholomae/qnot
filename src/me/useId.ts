import { selectId } from "./meSlice";
import { useSelector } from "../store/useSelector";

export function useId() {
  return useSelector(selectId);
}
