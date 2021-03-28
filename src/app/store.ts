import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import nameReducer from "../MainView/nameSlice";

export function createStore() {
  return configureStore({
    reducer: {
      name: nameReducer,
    },
  });
}

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
