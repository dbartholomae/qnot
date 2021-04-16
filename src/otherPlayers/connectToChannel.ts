import { Channel } from "../channel/Channel";
import { Store } from "../store/store";
import { Player } from "./Player";
import { addOrUpdatePlayer } from "./otherPlayersSlice";
import { selectId } from "../me/meSlice";
import { JoinRoomEvent } from "../channel/JoinRoomEvent";

export function connectToChannel(channel: Channel, store: Store) {
  channel.subscribe((message) => {
    if (message.name === JoinRoomEvent.type) {
      const myId = selectId(store.getState());
      if (message.data.id === myId) {
        return;
      }
      store.dispatch(
        addOrUpdatePlayer(
          new Player({
            id: message.data.id,
            name: message.data.name,
            isOnline: true,
          })
        )
      );
    }
  });
}
