import { addOrUpdatePlayer, selectPlayers } from "./playersSlice";
import { Player } from "./Player";
import { createStore } from "../store/store";

describe("otherPlayersSlice", () => {
  it("adds a new player to the list of players", () => {
    const newPlayer = new Player({
      name: "Daniel",
      isOnline: true,
    });
    const store = createStore();
    store.dispatch(addOrUpdatePlayer(newPlayer));
    expect(selectPlayers(store.getState())).toContainEqual(newPlayer);
  });

  it("does not add a player that already is in the list", () => {
    const existingPlayer = new Player({
      name: "Daniel",
      isOnline: true,
    });
    const store = createStore();
    store.dispatch(addOrUpdatePlayer(existingPlayer));
    store.dispatch(addOrUpdatePlayer(existingPlayer));
    expect(selectPlayers(store.getState()).length).toBe(1);
  });
});
