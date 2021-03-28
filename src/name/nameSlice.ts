import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type NameState = string | null;

const initialState: NameState = null as NameState;

export const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setName } = nameSlice.actions;

export const selectName = (state: RootState) => state.name;

export default nameSlice.reducer;
