import { useHistory } from "react-router-dom";
import { useRandomRoomCode } from "./useRandomRoomCode";
import { useQuery } from "../useQuery";
import { TextFieldForm } from "../components/TextFieldForm";
import { getRoomPath } from "../RoomView/getRoomPath";
import { en } from "../locale";
import React from "react";

export function RoomCodeForm() {
  const { push } = useHistory();
  const randomRoomCode = useRandomRoomCode();
  const query = useQuery();
  const roomCodeFromQuery = query.get("roomCode");
  return (
    <TextFieldForm
      onConfirmValue={(roomCode) => push(getRoomPath(roomCode))}
      id="roomCode"
      initialValue={roomCodeFromQuery ?? randomRoomCode}
      label={en.MainView.roomCodeLabel}
      confirmLabel={en.MainView.joinRoom}
    />
  );
}
