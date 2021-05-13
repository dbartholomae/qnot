import { Types } from "ably";
import { Presence } from "./Presence";
import RealtimeChannelCallbacks = Types.RealtimeChannelCallbacks;

export interface Channel {
  presence: Presence;
  publish: (message: { name: string; data: unknown }) => void;
  subscribe: RealtimeChannelCallbacks["subscribe"];
  unsubscribe: RealtimeChannelCallbacks["unsubscribe"];
}
