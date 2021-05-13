import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { joinRoom, leaveRoom } from "../../business-logic/game/gameSlice";

export function useRoom(roomCode: string) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(joinRoom(roomCode));
    return () => {
      dispatch(leaveRoom());
    };
  }, [dispatch, roomCode]);
}
