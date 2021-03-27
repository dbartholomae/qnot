import React, { FunctionComponent, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import en from "../locale/en.json";

interface Props {
  onChooseRoomCode: (roomCode: string) => void;
}

export const ChooseRoomForm: FunctionComponent<Props> = ({
  onChooseRoomCode,
}) => {
  const [roomCode, setRoomCode] = useState("");
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
