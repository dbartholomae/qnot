import { TextFieldForm } from "../components/TextFieldForm";
import { en } from "../locale";
import React from "react";
import { useName } from "./useName";

export function NameForm() {
  const [_, setName] = useName();
  return (
    <TextFieldForm
      onConfirmValue={setName}
      id="name"
      label={en.MainView.nameLabel}
      confirmLabel={en.MainView.saveName}
    />
  );
}
