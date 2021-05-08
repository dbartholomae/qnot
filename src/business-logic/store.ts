import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as meReducer } from "./me/";
import { reducer as playersReducer } from "./players";
import { reducer as roomSettingsReducer } from "./roomSettings";
import { reducer as gameReducer } from "./game";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
  thunk: false,
});

export function createStore() {
  return configureStore({
    middleware: customizedMiddleware,
    reducer: {
      game: gameReducer,
      me: meReducer,
      players: playersReducer,
      roomSettings: roomSettingsReducer,
    },
  });
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;
