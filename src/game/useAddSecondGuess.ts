import { useDispatch } from "../store/useDispatch";
import { useId } from "../me/useId";
import { Guess } from "./Player";
import { addSecondGuessToPlayer } from "./gameSlice";

export function useAddSecondGuess() {
  const id = useId();
  const dispatch = useDispatch();
  function addSecondGuess(guess: Guess) {
    dispatch(addSecondGuessToPlayer({ guess, id }));
  }
  return addSecondGuess;
}
