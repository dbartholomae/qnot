import { useSelector } from "../store/useSelector";
import { selectMyWord } from "./gameSlice";

export function useMyWord() {
  return useSelector(selectMyWord);
}
