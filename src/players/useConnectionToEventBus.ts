import { useEffect } from "react";
import { connectToEventBus } from "./connectToEventBus";
import { useEventBus } from "../eventBus/useEventBus";
import { useStore } from "react-redux";

export function useConnectionToEventBus() {
  const eventBus = useEventBus();
  const store = useStore();
  useEffect(() => {
    connectToEventBus(eventBus, store);
  }, [eventBus, store]);
}
