import { Types } from "ably";
import { v4 as uuid } from "uuid";

export class MockMessage implements Types.Message {
  clientId = uuid();
  connectionId = uuid();
  data = {};
  encoding = "";
  extras = {};
  id = uuid();
  name = "example-name";
  timestamp = 0;

  constructor(overwrites: Partial<Types.Message> = {}) {
    Object.assign(this, overwrites);
  }
}
