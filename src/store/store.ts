import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import nameReducer from "../name/nameSlice";

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
