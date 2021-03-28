import { useState } from "react";
import createRandomWords from "random-words";

export function useRandomRoomCode() {
  const [roomCode] = useState(() =>
    (createRandomWords(3) as string[]).join("-")
  );
  return roomCode;
}
