import { v4 as uuid } from "uuid";
import { Optional } from "utility-types";

export type Guess = [Player["id"], Player["id"]];

export class Player {
  id: string;
  name: string;
  isOnline: boolean;
  word?: string | null;
  descriptions: string[] = [];
  guesses: Guess[] = [];

  constructor({
    id = uuid(),
    name,
    isOnline,
    word,
  }: Optional<Player, "id" | "descriptions" | "guesses">) {
    this.name = name;
    this.isOnline = isOnline;
    this.id = id;
    this.word = word;
  }
}
