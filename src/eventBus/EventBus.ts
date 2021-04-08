import { Types } from "ably";
import RealtimeChannelCallbacks = Types.RealtimeChannelCallbacks;

export interface EventBus {
  publish: RealtimeChannelCallbacks["publish"];
  subscribe: RealtimeChannelCallbacks["subscribe"];
}
