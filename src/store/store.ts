import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { reducer as nameReducer } from "../name/";
import { reducer as playersReducer } from "../players";
import { reducer as roomSettingsReducer } from "../roomSettings";

export function createStore({
  preloadedState,
}: Omit<ConfigureStoreOptions, "reducer"> = {}) {
  return configureStore({
    preloadedState,
    reducer: {
      name: nameReducer,
      players: playersReducer,
      roomSettings: roomSettingsReducer,
    },
  });
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;
