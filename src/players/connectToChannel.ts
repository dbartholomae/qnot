import { Channel } from "../channel/Channel";
import { Store } from "../store/store";
import { Player } from "./Player";
import { Types } from "ably";
import { addOrUpdatePlayer, markPlayerOffline } from "./playersSlice";

export function connectToChannel(channel: Channel, store: Store) {
  const newPlayerListener = (message: Types.PresenceMessage) => {
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

  function playerLeavingListener(message: Types.PresenceMessage) {
    store.dispatch(markPlayerOffline(message.clientId));
  }

  channel.presence.subscribe("enter", newPlayerListener);
  channel.presence.subscribe("present", newPlayerListener);
  channel.presence.subscribe("leave", playerLeavingListener);
}
