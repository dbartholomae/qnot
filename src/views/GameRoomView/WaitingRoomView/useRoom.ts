import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { joinRoom } from "../../../business-logic/game/gameSlice";

export function useRoom(roomCode: string) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(joinRoom(roomCode));
  }, [dispatch, roomCode]);
}
