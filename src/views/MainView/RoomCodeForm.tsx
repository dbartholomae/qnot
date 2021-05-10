import { createRandomRoomCode, useRandomRoomCode } from "./useRandomRoomCode";
import { useHistory, useQuery } from "../../services/router";
import { getRoomPath } from "../WaitingRoomView/getRoomPath";
import { en } from "../../services/locale";
import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Cached } from "@material-ui/icons";
import { useDispatch } from "../../business-logic/useDispatch";
import { setHost } from "../../business-logic/roomSettings";

export function RoomCodeForm() {
  const { push } = useHistory();
  const randomRoomCode = useRandomRoomCode();
  const query = useQuery();
  const dispatch = useDispatch();

  const roomCodeFromQuery = query.get("roomCode");
  const [roomCode, setRoomCode] = useState(roomCodeFromQuery ?? randomRoomCode);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(setHost(true));
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
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={en.MainView.generateNewRoomCode}>
                <IconButton
                  aria-label={en.MainView.generateNewRoomCode}
                  onClick={() => setRoomCode(createRandomRoomCode())}
                >
                  <Cached />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        {en.MainView.createRoom}
      </Button>
    </form>
  );
}
