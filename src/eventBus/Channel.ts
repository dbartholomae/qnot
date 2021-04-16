import { EventBus } from "./EventBus";

export type ChannelCreator = (roomCode: string) => EventBus;
