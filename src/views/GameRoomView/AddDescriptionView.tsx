import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { en } from "../../services/locale";
import {
  useAddFirstDescription,
  useAddSecondDescription,
} from "../../business-logic/game";
import { MyWord } from "./MyWord";

export interface Props {
  onChoose: (description: string) => void;
}

function DescriptionForm({ onChoose }: Props) {
  const [description, setDescription] = useState("");
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onChoose(description);
      }}
      style={{
        display: "flex",
        gap: 12,
      }}
    >
      <TextField
        id="description"
        label={en.GameRoomView.describeYourWord}
        value={description}
        variant="filled"
        onChange={(event) => setDescription(event.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Describe
      </Button>
    </form>
  );
}

export function AddDescriptionView({ onChoose }: Props) {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Game
      </Typography>
      <MyWord />
      <DescriptionForm onChoose={onChoose} />
    </Container>
  );
}

export function AddFirstDescriptionView() {
  const addFirstDescription = useAddFirstDescription();
  return <AddDescriptionView onChoose={addFirstDescription} />;
}

export function AddSecondDescriptionView() {
  const addSecondDescription = useAddSecondDescription();
  return <AddDescriptionView onChoose={addSecondDescription} />;
}
