import { useDispatch } from "../store/useDispatch";
import { setName as setNameAction } from "../name/nameSlice";
import { TextFieldForm } from "../components/TextFieldForm";
import { en } from "../locale";
import React from "react";

export function NameForm() {
  const dispatch = useDispatch();
  const setName = (newName: string) => dispatch(setNameAction(newName));
  return (
    <TextFieldForm
      onConfirmValue={setName}
      id="name"
      label={en.MainView.nameLabel}
      confirmLabel={en.MainView.saveName}
    />
  );
}
