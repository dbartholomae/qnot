import { useState } from "react";
import createRandomWords from "random-words";

export function createRandomRoomCode() {
  return (createRandomWords(3) as string[]).join("-");
}

export function useRandomRoomCode() {
  const [roomCode] = useState(() => createRandomRoomCode());
  return roomCode;
}
