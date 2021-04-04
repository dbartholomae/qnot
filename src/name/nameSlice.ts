import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { getFromLocalStorage } from "../localStorage";

type NameState = string | null;

const initialState: NameState = getFromLocalStorage("name");

export const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const selectName = (state: RootState) => state.name;

export const { setName } = nameSlice.actions;
export const reducer = nameSlice.reducer;
