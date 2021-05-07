import { Guess } from "./Player";
import { addSecondGuessToPlayer } from "./gameSlice";
import { useDispatchWithId } from "./useDispatchWithId";

export function useAddSecondGuess() {
  return useDispatchWithId((id, guess: Guess) =>
    addSecondGuessToPlayer({ guess, id })
  );
}
