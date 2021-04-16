import { Channel } from "../channel/Channel";
import { Store } from "../store/store";
import { Player } from "./Player";
import { selectId } from "../me/meSlice";
import { Types } from "ably";
import { addOrUpdatePlayer } from "./playersSlice";

export function connectToChannel(channel: Channel, store: Store) {
  const newPlayerListener = (message: Types.PresenceMessage) => {
    const myId = selectId(store.getState());
    if (message.clientId === myId) {
      return;
    }
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
}
