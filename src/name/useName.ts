import { useDispatch } from "../store/useDispatch";
import { selectName, setName as setNameAction } from "./nameSlice";
import { useSelector } from "../store/useSelector";
import { useEffect } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../localStorage";

export function useName() {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const setName = (newName: string) => {
    saveToLocalStorage("name", newName);
    dispatch(setNameAction(newName));
  };
  useEffect(() => {
    const nameFromLocalStorage = getFromLocalStorage("name");
    if (nameFromLocalStorage !== null) {
      setName(nameFromLocalStorage);
    }
  });
  return [name, setName] as const;
}
