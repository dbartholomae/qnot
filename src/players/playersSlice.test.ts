import { addPlayer, selectPlayers } from "./playersSlice";
import { Player } from "./Player";
import { createStore } from "../store/store";

describe("playersSlice", () => {
  it("adds a new player to the list of players", () => {
    const newPlayer = new Player({
      name: "Daniel",
      isOnline: true,
    });
    const store = createStore();
    store.dispatch(addPlayer(newPlayer));
    expect(selectPlayers(store.getState())).toContainEqual(newPlayer);
  });

  it("does not add a player that already is in the list", () => {
    const existingPlayer = new Player({
      name: "Daniel",
      isOnline: true,
    });
    const store = createStore();
    store.dispatch(addPlayer(existingPlayer));
    store.dispatch(addPlayer(existingPlayer));
    expect(selectPlayers(store.getState()).length).toBe(1);
  });
});
