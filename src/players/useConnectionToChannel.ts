import { useEffect } from "react";
import { connectToChannel } from "./connectToChannel";
import { useStore } from "react-redux";
import { Channel } from "../channel/Channel";

export function useConnectionToChannel(channel: Channel) {
  const store = useStore();
  useEffect(() => {
    connectToChannel(channel, store);
  }, [channel, store]);
}
