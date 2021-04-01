import { useDispatch } from "../store/useDispatch";
import { selectName, setName as setNameAction } from "../name/nameSlice";
import { useSelector } from "../store/useSelector";

export function useName() {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const setName = (newName: string) => dispatch(setNameAction(newName));
  return [name, setName] as const;
}
