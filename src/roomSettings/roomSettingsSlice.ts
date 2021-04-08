import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface RoomSettingsState {
  isHost: boolean;
}

const initialState: RoomSettingsState = {
  isHost: false,
};

export const roomSettingsSlice = createSlice({
  name: "roomSettings",
  initialState,
  reducers: {
    setHost: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isHost: action.payload,
    }),
  },
});

export const { setHost } = roomSettingsSlice.actions;
export const selectRoomSettings = (state: RootState) => state.roomSettings;
export const selectIsHost = (state: RootState) =>
  selectRoomSettings(state).isHost;

export const reducer = roomSettingsSlice.reducer;
