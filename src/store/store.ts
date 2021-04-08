import { configureStore } from "@reduxjs/toolkit";
import { reducer as meReducer } from "../me/";
import { reducer as otherPlayersReducer } from "../otherPlayers";
import { reducer as roomSettingsReducer } from "../roomSettings";

export function createStore() {
  return configureStore({
    reducer: {
      me: meReducer,
      otherPlayers: otherPlayersReducer,
      roomSettings: roomSettingsReducer,
    },
  });
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;
