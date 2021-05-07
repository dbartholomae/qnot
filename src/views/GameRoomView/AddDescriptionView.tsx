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

export function AddDescriptionView({ onChoose }: Props) {
  const [description, setDescription] = useState("");
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Game
      </Typography>
      <MyWord />
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
