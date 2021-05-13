import React from "react";
import {
  useAddFirstDescription,
  useAddSecondDescription,
  usePlayers,
} from "../../../business-logic/game";
import { MyWord } from "../shared/MyWord/MyWord";
import { DescriptionForm } from "./DescriptionForm";
import { PlayerList } from "../shared/PlayerList/PlayerList";
import { en } from "../../../services/locale";
import { Page } from "../../../components/Page";

export interface Props {
  onChoose: (description: string) => void;
}

export function AddDescriptionView({ onChoose }: Props) {
  const players = usePlayers();
  return (
    <Page title={en.GameRoomView.title}>
      <PlayerList players={players} />
      <MyWord />
      <DescriptionForm onChoose={onChoose} />
    </Page>
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
