import { EventBus } from "../eventBus/EventBus";
import { Store } from "../store/store";
import { Player } from "./Player";
import { addPlayer } from "./otherPlayersSlice";
import { selectId } from "../me/meSlice";

export function connectToEventBus(eventBus: EventBus, store: Store) {
  eventBus.subscribe("joinRoom", (message) => {
    const myId = selectId(store.getState());
    if (message.data.id === myId) {
      return;
    }
    store.dispatch(
      addPlayer(
        new Player({
          id: message.data.id,
          name: message.data.name,
          isOnline: true,
        })
      )
    );
  });
}
