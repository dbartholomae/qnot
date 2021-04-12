import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { RootState } from "../store/store";
import { getFromLocalStorage } from "../localStorage";

type MeState = {
  id: string;
  name: string | null;
};

const initialState: MeState = {
  id: uuid(),
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
export const selectId = (state: RootState) => state.me.id;

export const { setName } = meSlice.actions;

export const reducer = meSlice.reducer;
