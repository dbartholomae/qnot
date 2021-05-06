import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { en } from "../locale";
import { useAddFirstDescription, useAddSecondDescription } from "../game";

function AddDescription({
  onChoose,
}: {
  onChoose: (description: string) => void;
}) {
  const [description, setDescription] = useState("");
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onChoose(description);
      }}
    >
      <TextField
        id="description"
        label={en.GameRoomView.describeYourWord}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Button type="submit">Describe</Button>
    </form>
  );
}

export function AddFirstDescription() {
  const addFirstDescription = useAddFirstDescription();
  return <AddDescription onChoose={addFirstDescription} />;
}

export function AddSecondDescription() {
  const addSecondDescription = useAddSecondDescription();
  return <AddDescription onChoose={addSecondDescription} />;
}
