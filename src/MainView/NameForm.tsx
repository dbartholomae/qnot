import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import en from "../locale/en.json";

interface Props {
  onChooseName: (name: string) => void;
}

export const NameForm = ({ onChooseName }: Props) => {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onChooseName(name);
      }}
    >
      <TextField
        autoComplete="off"
        id="name"
        label={en.MainView.nameLabel}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Button type="submit">{en.MainView.saveName}</Button>
    </form>
  );
};
