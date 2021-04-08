import { createContext } from "react";
import { EventBus } from "./EventBus";

export const EventBusContext = createContext<EventBus>(
  (undefined as unknown) as EventBus
);
