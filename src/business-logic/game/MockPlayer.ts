import { v4 as uuid } from "uuid";
import { Player } from "./Player";
import faker from "faker";

export class MockPlayer implements Player {
  id = uuid();
  name = faker.name.firstName();
  isOnline = true;
  descriptions = faker.random.arrayElements([
    faker.random.word("noun"),
    faker.random.word("noun"),
  ]);
  guesses = [];
  word = faker.random.word("noun");

  constructor(overrides: Partial<Player> = {}) {
    Object.assign(this, overrides);
  }
}
