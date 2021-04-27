import { useDispatch } from "../store/useDispatch";
import { useId } from "../me/useId";
import { Guess } from "./Player";
import { addFirstGuessToPlayer } from "./gameSlice";

export function useAddFirstGuess() {
  const id = useId();
  const dispatch = useDispatch();
  function addFirstGuess(guess: Guess) {
    dispatch(addFirstGuessToPlayer({ guess, id }));
  }
  return addFirstGuess;
}
