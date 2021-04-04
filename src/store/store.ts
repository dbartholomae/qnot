import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { reducer as nameReducer } from "../name/";

export function createStore({
  preloadedState,
}: Omit<ConfigureStoreOptions, "reducer"> = {}) {
  return configureStore({
    preloadedState,
    reducer: {
      name: nameReducer,
    },
  });
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;
