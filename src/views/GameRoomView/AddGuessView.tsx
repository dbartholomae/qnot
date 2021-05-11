import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import {
  Guess,
  Player,
  useAddFirstGuess,
  useAddSecondGuess,
  usePlayers,
} from "../../business-logic/game";
import { MyWord } from "./MyWord";
import { PlayerList } from "../WaitingRoomView/PlayerList";
import { en } from "../../services/locale";
import { Page } from "../../components/Page";

export function AddGuessView({
  onChoose,
}: {
  onChoose: (guess: Guess) => void;
}) {
  const [guess, setGuess] = useState<Player["id"][]>([]);
  const [alreadyGuessed, setAlreadyGuessed] = useState(false);
  const players = usePlayers();
  const onChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) =>
    checked
      ? setGuess((guess) => [...guess, event.target.name])
      : setGuess((guess) => guess.filter((id) => id !== event.target.name));
  return (
    <Page title={en.GameRoomView.title}>
      <PlayerList players={players} />
      <MyWord />
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (guess.length !== 2) return;
          onChoose(guess as Guess);
          setAlreadyGuessed(true);
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <FormControl required component="fieldset">
          <FormLabel component="legend">
            {en.GameRoomView.guessWhoIsInATeam}
          </FormLabel>
          <FormGroup>
            {players.map((player) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={guess.includes(player.id)}
                    disabled={alreadyGuessed}
                    onChange={onChange}
                    name={player.id}
                  />
                }
                key={player.id}
                label={player.name}
              />
            ))}
          </FormGroup>
        </FormControl>
        <Button
          type="submit"
          disabled={guess.length !== 2 || alreadyGuessed}
          variant="contained"
          color="primary"
        >
          {alreadyGuessed
            ? en.GameRoomView.waitingForOtherPlayers
            : en.GameRoomView.guess}
        </Button>
      </form>
    </Page>
  );
}

export function AddFirstGuessView() {
  const addFirstGuess = useAddFirstGuess();
  return <AddGuessView onChoose={addFirstGuess} />;
}

export function AddSecondGuessView() {
  const addSecondGuess = useAddSecondGuess();
  return <AddGuessView onChoose={addSecondGuess} />;
}
