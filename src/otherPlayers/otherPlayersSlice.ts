import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Player } from "./Player";

type OtherPlayersState = { [id: string]: Player };

const initialState: OtherPlayersState = {};

export const otherPlayersSlice = createSlice({
  name: "otherPlayers",
  initialState,
  reducers: {
    addOrUpdatePlayer: (
      state,
      { payload: newPlayer }: PayloadAction<Player>
    ) => ({
      ...state,
      [newPlayer.id]: newPlayer,
    }),
  },
});

export const { addOrUpdatePlayer } = otherPlayersSlice.actions;

export const selectPlayers = (state: RootState): Player[] =>
  Object.values(state.otherPlayers);

export const reducer = otherPlayersSlice.reducer;
