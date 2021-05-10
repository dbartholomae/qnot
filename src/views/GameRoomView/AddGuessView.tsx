import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
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

export function AddGuessView({
  onChoose,
}: {
  onChoose: (guess: Guess) => void;
}) {
  const [guess, setGuess] = useState<Player["id"][]>([]);
  const players = usePlayers();
  const onChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) =>
    checked
      ? setGuess((guess) => [...guess, event.target.name])
      : setGuess((guess) => guess.filter((id) => id !== event.target.name));
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Game
      </Typography>
      <PlayerList players={players} />
      <MyWord />
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (guess.length !== 2) return;
          onChoose(guess as Guess);
        }}
      >
        <FormControl required component="fieldset">
          <FormLabel component="legend">Pick two</FormLabel>
          <FormGroup>
            {players.map((player) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={guess.includes(player.id)}
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
        <Button type="submit" disabled={guess.length !== 2}>
          Guess
        </Button>
      </form>
    </Container>
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
