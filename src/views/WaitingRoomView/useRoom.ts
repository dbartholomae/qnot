import { useId } from "../../business-logic/me/useId";
import { useName } from "../../business-logic/me";
import { useChannelCreator } from "../../services/channel/useChannelCreator";
import { useEffect, useState } from "react";
import { useConnectionToChannel } from "../../business-logic/players/useConnectionToChannel";

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
