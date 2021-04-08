import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { reducer as meReducer } from "../me/";
import { reducer as otherPlayersReducer } from "../otherPlayers";
import { reducer as roomSettingsReducer } from "../roomSettings";

export function createStore({
  preloadedState,
}: Omit<ConfigureStoreOptions, "reducer"> = {}) {
  return configureStore({
    preloadedState,
    reducer: {
      me: meReducer,
      otherPlayers: otherPlayersReducer,
      roomSettings: roomSettingsReducer,
    },
  });
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;
