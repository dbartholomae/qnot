import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
});

export const selectRoomSettings = (state: RootState) => state.roomSettings;
export const selectIsHost = (state: RootState) =>
  selectRoomSettings(state).isHost;

export const reducer = roomSettingsSlice.reducer;
