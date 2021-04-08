import { useContext } from "react";
import { EventBusContext } from "./EventBusContext";

export function useEventBus() {
  return useContext(EventBusContext);
}
