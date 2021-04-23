import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as meReducer } from "../me/";
import { reducer as playersReducer } from "../players";
import { reducer as roomSettingsReducer } from "../roomSettings";
import { reducer as gameReducer } from "../game/gameSlice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
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
