import { ReactNode } from "react";
import { useRoom } from "./useRoom";

interface Props {
  children?: ReactNode;
  roomCode: string;
}

export function RoomGuard({ children, roomCode }: Props) {
  const { connecting } = useRoom(roomCode);
  if (connecting) return null;
  return <>{children}</>;
}
