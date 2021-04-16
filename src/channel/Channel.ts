import { Types } from "ably";
import RealtimeChannelCallbacks = Types.RealtimeChannelCallbacks;

export interface Channel {
  publish: RealtimeChannelCallbacks["publish"];
  subscribe: RealtimeChannelCallbacks["subscribe"];
}
