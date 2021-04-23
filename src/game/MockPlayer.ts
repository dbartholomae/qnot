import { v4 as uuid } from "uuid";
import { Player } from "./Player";
import faker from "faker";

export class MockPlayer implements Player {
  id = uuid();
  name = faker.name.firstName();
  isOnline = true;
  descriptions = [];

  constructor(overrides: Partial<Player> = {}) {
    Object.assign(this, overrides);
  }
}
