import { Channel } from "./Channel";

export type ChannelCreator = (roomCode: string) => Channel;
