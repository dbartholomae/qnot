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
} from "../../business-logic/game";
import { usePlayers } from "../../business-logic/players";

function AddGuess({ onChoose }: { onChoose: (guess: Guess) => void }) {
  const [guess, setGuess] = useState<Player["id"][]>([]);
  const players = usePlayers();
  const onChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) =>
    checked
      ? setGuess((guess) => [...guess, event.target.name])
      : setGuess((guess) => guess.filter((id) => id !== event.target.name));
  return (
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
  );
}

export function AddFirstGuess() {
  const addFirstGuess = useAddFirstGuess();
  return <AddGuess onChoose={addFirstGuess} />;
}

export function AddSecondGuess() {
  const addSecondGuess = useAddSecondGuess();
  return <AddGuess onChoose={addSecondGuess} />;
}
