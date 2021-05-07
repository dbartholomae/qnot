import { addFirstDescriptionToPlayer } from "./gameSlice";
import { useDispatchWithId } from "./useDispatchWithId";

export function useAddFirstDescription() {
  return useDispatchWithId((id, description: string) =>
    addFirstDescriptionToPlayer({ description, id })
  );
}
