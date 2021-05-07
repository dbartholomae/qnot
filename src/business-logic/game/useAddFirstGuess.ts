import { Guess } from "./Player";
import { addFirstGuessToPlayer } from "./gameSlice";
import { useDispatchWithId } from "./useDispatchWithId";

export function useAddFirstGuess() {
  return useDispatchWithId((id, guess: Guess) =>
    addFirstGuessToPlayer({ guess, id })
  );
}
