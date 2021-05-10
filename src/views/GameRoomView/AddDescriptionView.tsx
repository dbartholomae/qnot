import React from "react";
import { Container, Typography } from "@material-ui/core";
import {
  useAddFirstDescription,
  useAddSecondDescription,
  usePlayers,
} from "../../business-logic/game";
import { MyWord } from "./MyWord";
import { DescriptionForm } from "./DescriptionForm";
import { PlayerList } from "../WaitingRoomView/PlayerList";
import { en } from "../../services/locale";

export interface Props {
  onChoose: (description: string) => void;
}

export function AddDescriptionView({ onChoose }: Props) {
  const players = usePlayers();
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {en.GameRoomView.title}
      </Typography>
      <PlayerList players={players} />
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
