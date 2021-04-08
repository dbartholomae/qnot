import { FunctionComponent } from "react";
import { EventBusContext } from "./EventBusContext";
import { ablyEventBus } from "./ably";
import { EventBus } from "./EventBus";

interface Props {
  eventBus?: EventBus;
}

export const EventBusProvider: FunctionComponent<Props> = ({
  children,
  eventBus = ablyEventBus,
}) => (
  <EventBusContext.Provider value={eventBus}>
    {children}
  </EventBusContext.Provider>
);
