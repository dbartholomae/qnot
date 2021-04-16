import { Types } from "ably";
import RealtimeChannelCallbacks = Types.RealtimeChannelCallbacks;

export interface Presence {
  enterClient: RealtimeChannelCallbacks["presence"]["enterClient"];
  subscribe: RealtimeChannelCallbacks["presence"]["subscribe"];
}
