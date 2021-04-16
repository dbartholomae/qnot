import { Channel } from "../channel/Channel";
import { Store } from "../store/store";
import { Player } from "./Player";
import { Types } from "ably";
import { addOrUpdatePlayer } from "./playersSlice";

export function connectToChannel(channel: Channel, store: Store) {
  const newPlayerListener = (message: Types.PresenceMessage) => {
    console.log({ message });
    store.dispatch(
      addOrUpdatePlayer(
        new Player({
          id: message.clientId,
          name: message.data.name,
          isOnline: true,
        })
      )
    );
  };
  channel.presence.subscribe("enter", newPlayerListener);
  channel.presence.subscribe("present", newPlayerListener);
}
