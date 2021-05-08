import { Types } from "ably";

export interface Presence {
  enterClient: Types.RealtimeChannelCallbacks["presence"]["enterClient"];
  leaveClient: Types.RealtimeChannelCallbacks["presence"]["leave"];
  subscribe: Types.RealtimeChannelCallbacks["presence"]["subscribe"];
  unsubscribe: Types.RealtimeChannelCallbacks["presence"]["unsubscribe"];
}
