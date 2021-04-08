import { EventBus } from "../eventBus/EventBus";
import { Store } from "../store/store";
import { addPlayer } from "./playersSlice";

export function connectToEventBus(eventBus: EventBus, store: Store) {
  eventBus.subscribe("joinRoom", (message) => {
    store.dispatch(addPlayer({ name: message.data.name, isOnline: true }));
  });
}
