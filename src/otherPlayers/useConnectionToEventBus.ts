import { useEffect } from "react";
import { connectToEventBus } from "./connectToEventBus";
import { useStore } from "react-redux";
import { EventBus } from "../eventBus/EventBus";

export function useConnectionToEventBus(eventBus: EventBus) {
  const store = useStore();
  useEffect(() => {
    connectToEventBus(eventBus, store);
  }, [eventBus, store]);
}
