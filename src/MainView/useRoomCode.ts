import { useEffect, useState } from "react";
import createRandomWords from "random-words";

export function useRoomCode() {
  const [roomCode, setRoomCode] = useState("");
  useEffect(() => {
    setRoomCode((createRandomWords(3) as string[]).join("-"));
  }, []);
  return { roomCode, setRoomCode };
}
