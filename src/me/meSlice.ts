import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { getFromLocalStorage } from "../localStorage";

type MeState = {
  name: string | null;
};

const initialState: MeState = {
  name: getFromLocalStorage("name"),
};

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
  },
});

export const selectName = (state: RootState) => state.me.name;

export const { setName } = meSlice.actions;
export const reducer = meSlice.reducer;
