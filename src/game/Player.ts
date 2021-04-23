import { v4 as uuid } from "uuid";
import { Optional } from "utility-types";

export class Player {
  id: string;
  name: string;
  isOnline: boolean;
  word?: string | null;

  constructor({ id = uuid(), name, isOnline }: Optional<Player, "id">) {
    this.name = name;
    this.isOnline = isOnline;
    this.id = id;
  }
}
