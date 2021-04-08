import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { getFromLocalStorage } from "../localStorage";

type MeState = string | null;

const initialState: MeState = getFromLocalStorage("name");

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const selectName = (state: RootState) => state.me;

export const { setName } = meSlice.actions;
export const reducer = meSlice.reducer;
