import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Player } from "../game/Player";

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
    markPlayerOffline: (
      state,
      { payload: id }: PayloadAction<Player["id"]>
    ) => {
      if (state[id] === undefined) {
        return;
      }
      state[id].isOnline = false;
    },
  },
});

export const { addOrUpdatePlayer, markPlayerOffline } = playersSlice.actions;

export const selectPlayers = (state: RootState): Player[] =>
  Object.values(state.players);

export const reducer = playersSlice.reducer;
