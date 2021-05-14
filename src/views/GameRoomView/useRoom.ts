import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  joinRoom,
  leaveRoom,
  selectConnectedToChannel,
} from "../../business-logic/game/gameSlice";
import { useSelector } from "../../business-logic/useSelector";

export function useRoom(roomCode: string) {
  const dispatch = useDispatch();
  const connectedToChannel = useSelector(selectConnectedToChannel);
  useEffect(() => {
    dispatch(joinRoom(roomCode));
    return () => {
      dispatch(leaveRoom());
    };
  }, [dispatch, roomCode]);

  return { connecting: !connectedToChannel };
}
