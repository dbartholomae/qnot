import { useHistory } from "react-router-dom";
import { createRandomRoomCode, useRandomRoomCode } from "./useRandomRoomCode";
import { useQuery } from "../useQuery";
import { getRoomPath } from "../RoomView/getRoomPath";
import { en } from "../locale";
import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { Cached } from "@material-ui/icons";

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
      <TextField
        autoComplete="off"
        autoFocus
        id={"roomCode"}
        label={en.MainView.roomCodeLabel}
        value={roomCode}
        variant="filled"
        onChange={(event) => setRoomCode(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={en.MainView.createNewRoomCode}
                onClick={() => setRoomCode(createRandomRoomCode())}
              >
                <Cached />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        {en.MainView.joinRoom}
      </Button>
    </form>
  );
}
