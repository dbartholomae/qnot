import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as meReducer } from "./me/";
import { reducer as playersReducer } from "./players";
import { reducer as gameReducer } from "./game";
import createSagaMiddleware from "redux-saga";
import { gameSaga } from "./game/gameSaga";
import { ChannelCreator } from "../services/channel/ChannelCreator";

export function createStore(createChannel: ChannelCreator) {
  const sagaMiddleware = createSagaMiddleware({ context: { createChannel } });

  const customizedMiddleware = [
    ...getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }),
    sagaMiddleware,
  ];
  const store = configureStore({
    middleware: customizedMiddleware,
    reducer: {
      game: gameReducer,
      me: meReducer,
      players: playersReducer,
    },
  });
  sagaMiddleware.run(gameSaga);
  return store;
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;
