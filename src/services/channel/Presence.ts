import { Types } from "ably";

export interface Presence {
  enterClient: (clientId: string, data: unknown) => Promise<void>;
  leaveClient: Types.RealtimeChannelCallbacks["presence"]["leave"];
  subscribe: Types.RealtimeChannelCallbacks["presence"]["subscribe"];
  unsubscribe: Types.RealtimeChannelCallbacks["presence"]["unsubscribe"];
}
