import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as meReducer } from "./me/";
import { reducer as playersReducer } from "./players";
import { reducer as roomSettingsReducer } from "./roomSettings";
import { reducer as gameReducer } from "./game";
import createSagaMiddleware from "redux-saga";
import { gameSaga } from "./game/gameSaga";

const sagaMiddleware = createSagaMiddleware();

const customizedMiddleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
    thunk: false,
  }),
  sagaMiddleware,
];

export function createStore() {
  const store = configureStore({
    middleware: customizedMiddleware,
    reducer: {
      game: gameReducer,
      me: meReducer,
      players: playersReducer,
      roomSettings: roomSettingsReducer,
    },
  });
  sagaMiddleware.run(gameSaga);
  return store;
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;
