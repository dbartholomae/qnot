import { Types } from "ably";
import { Presence } from "./Presence";
import RealtimeChannelCallbacks = Types.RealtimeChannelCallbacks;

export interface Channel {
  presence: Presence;
  publish: RealtimeChannelCallbacks["publish"];
  subscribe: RealtimeChannelCallbacks["subscribe"];
  unsubscribe: RealtimeChannelCallbacks["unsubscribe"];
}
