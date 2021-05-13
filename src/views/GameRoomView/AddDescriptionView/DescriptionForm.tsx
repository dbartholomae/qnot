import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { en } from "../../../services/locale";

export interface Props {
  onChoose: (description: string) => void;
}

export function DescriptionForm({ onChoose }: Props) {
  const [description, setDescription] = useState("");
  const [descriptionChosen, setDescriptionChosen] = useState(false);
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onChoose(description);
        setDescriptionChosen(true);
      }}
      style={{
        display: "flex",
        gap: 12,
      }}
    >
      <TextField
        disabled={descriptionChosen}
        id="description"
        label={en.GameRoomView.describeYourWord}
        value={description}
        variant="filled"
        onChange={(event) => setDescription(event.target.value)}
      />
      <Button
        disabled={descriptionChosen}
        type="submit"
        variant="contained"
        color="primary"
      >
        {descriptionChosen
          ? en.GameRoomView.waitingForOtherPlayers
          : en.GameRoomView.chooseThisDescription}
      </Button>
    </form>
  );
}
