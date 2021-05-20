import { Player } from "./Player";

export interface PlayerWithPoints extends Player {
  pointChange: number;
}
