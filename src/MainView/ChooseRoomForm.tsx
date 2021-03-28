import React, { FunctionComponent } from "react";
import { Button, TextField } from "@material-ui/core";
import en from "../locale/en.json";
import { useRoomCode } from "./useRoomCode";

interface Props {
  onChooseRoomCode: (roomCode: string) => void;
}

export const ChooseRoomForm: FunctionComponent<Props> = ({
  onChooseRoomCode,
}) => {
  const { roomCode, setRoomCode } = useRoomCode();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onChooseRoomCode(roomCode);
      }}
    >
      <TextField
        autoComplete="off"
        id="roomCode"
        label={en.MainView.roomCodeLabel}
        value={roomCode}
        onChange={(event) => setRoomCode(event.target.value)}
      />
      <Button type="submit">{en.MainView.joinRoom}</Button>
    </form>
  );
};
