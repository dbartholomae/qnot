import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

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
        id="name"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Button type="submit">Save name</Button>
    </form>
  );
};
