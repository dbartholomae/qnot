import { Types } from "ably";
import { v4 as uuid } from "uuid";

export class MockPresenceMessage implements Types.PresenceMessage {
  action = "enter" as const;
  clientId = uuid();
  connectionId = uuid();
  data = {};
  encoding = "unknown";
  id = uuid();
  timestamp = 0;

  constructor(overwrites: Partial<Types.PresenceMessage> = {}) {
    Object.assign(this, overwrites);
  }
}
