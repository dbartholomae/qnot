import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Player } from "./Player";

type OtherPlayersState = { [id: string]: Player };

const initialState: OtherPlayersState = {};

export const playersSlice = createSlice({
  name: "players",
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

export const { addOrUpdatePlayer } = playersSlice.actions;

export const selectPlayers = (state: RootState): Player[] =>
  Object.values(state.players);

export const reducer = playersSlice.reducer;
