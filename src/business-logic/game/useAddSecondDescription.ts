import { addSecondDescriptionToPlayer } from "./gameSlice";
import { useDispatchWithId } from "./useDispatchWithId";

export function useAddSecondDescription() {
  return useDispatchWithId((id, description: string) =>
    addSecondDescriptionToPlayer({ description, id })
  );
}
