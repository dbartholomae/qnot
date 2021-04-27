import { useDispatch } from "../store/useDispatch";
import { useId } from "../me/useId";
import { addSecondDescriptionToPlayer } from "./gameSlice";

export function useAddSecondDescription() {
  const id = useId();
  const dispatch = useDispatch();
  function addSecondDescription(description: string) {
    dispatch(addSecondDescriptionToPlayer({ description, id }));
  }
  return addSecondDescription;
}
