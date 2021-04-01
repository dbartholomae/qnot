import { useHistory } from "react-router-dom";
import { createRandomRoomCode, useRandomRoomCode } from "./useRandomRoomCode";
import { useQuery } from "../useQuery";
import { getRoomPath } from "../RoomView/getRoomPath";
import { en } from "../locale";
import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

export function RoomCodeForm() {
  const { push } = useHistory();
  const randomRoomCode = useRandomRoomCode();
  const query = useQuery();
  const roomCodeFromQuery = query.get("roomCode");
  const [roomCode, setRoomCode] = useState(roomCodeFromQuery ?? randomRoomCode);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        push(getRoomPath(roomCode));
      }}
      style={{
        display: "flex",
        gap: 12,
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setRoomCode(createRandomRoomCode())}
      >
        {en.MainView.createNewRoomCode}
      </Button>
      <TextField
        autoComplete="off"
        id={"roomCode"}
        label={en.MainView.roomCodeLabel}
        value={roomCode}
        variant="filled"
        onChange={(event) => setRoomCode(event.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        {en.MainView.joinRoom}
      </Button>
    </form>
  );
}
