import React, { FunctionComponent, useState } from "react";
import { Button, TextField } from "@material-ui/core";

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
        label="Room code"
        value={roomCode}
        onChange={(event) => setRoomCode(event.target.value)}
      />
      <Button type="submit">Join</Button>
    </form>
  );
};
