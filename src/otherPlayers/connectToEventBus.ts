import { EventBus } from "../eventBus/EventBus";
import { Store } from "../store/store";
import { Player } from "./Player";
import { addPlayer } from "./otherPlayersSlice";

export function connectToEventBus(eventBus: EventBus, store: Store) {
  eventBus.subscribe("joinRoom", (message) => {
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
