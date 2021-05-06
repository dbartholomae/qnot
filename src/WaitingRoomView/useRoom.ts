import { useId } from "../me/useId";
import { useName } from "../me";
import { useChannelCreator } from "../channel/useChannelCreator";
import { useEffect, useState } from "react";
import { useConnectionToChannel } from "../players/useConnectionToChannel";

export function useRoom(roomCode: string) {
  const myId = useId();
  const [myName] = useName();
  const channelCreator = useChannelCreator();
  const [channel] = useState(() => channelCreator(roomCode));
  useConnectionToChannel(channel);
  useEffect(() => {
    channel.presence.enterClient(myId, { name: myName });
    return () => channel.presence.leaveClient(myId);
  }, [channel, myId, myName]);
}
