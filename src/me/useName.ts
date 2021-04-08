import { useDispatch } from "../store/useDispatch";
import { selectName, setName as setNameAction } from "./meSlice";
import { useSelector } from "../store/useSelector";
import { saveToLocalStorage } from "../localStorage";

export function useName() {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const setName = (newName: string) => {
    saveToLocalStorage("name", newName);
    dispatch(setNameAction(newName));
  };
  return [name, setName] as const;
}
