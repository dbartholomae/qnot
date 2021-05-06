import { useSelector } from "../useSelector";
import { selectMyWord } from "./gameSlice";

export function useMyWord() {
  return useSelector(selectMyWord);
}
