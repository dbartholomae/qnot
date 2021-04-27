import { useDispatch } from "../store/useDispatch";
import { useId } from "../me/useId";
import { addFirstDescriptionToPlayer } from "./gameSlice";

export function useAddFirstDescription() {
  const id = useId();
  const dispatch = useDispatch();
  function addFirstDescription(description: string) {
    dispatch(addFirstDescriptionToPlayer({ description, id }));
  }
  return addFirstDescription;
}
