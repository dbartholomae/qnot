import React from "react";
import { Container, Typography } from "@material-ui/core";
import {
  useAddFirstDescription,
  useAddSecondDescription,
} from "../../business-logic/game";
import { MyWord } from "./MyWord";
import { DescriptionForm } from "./DescriptionForm";

export interface Props {
  onChoose: (description: string) => void;
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
