import {
  Action,
  configureStore,
  ConfigureStoreOptions,
  ThunkAction,
} from "@reduxjs/toolkit";
import nameReducer from "../name/nameSlice";
import {
  TypedUseSelectorHook,
  useDispatch as useUntypedDispatch,
  useSelector as useUntypedSelector,
} from "react-redux";

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

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useUntypedDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useUntypedSelector;
