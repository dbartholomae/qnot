import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { selectName } from "../name";
import { Player } from "./Player";

type PlayersState = { [id: string]: Player };

const initialState: PlayersState = {};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, { payload: newPlayer }: PayloadAction<Player>) => ({
      ...state,
      [newPlayer.id]: newPlayer,
    }),
  },
});

export const { addPlayer } = playersSlice.actions;

export const selectPlayers = (state: RootState) =>
  [{ name: selectName(state), isOnline: true }].concat(
    Object.values(state.players)
  );

export const reducer = playersSlice.reducer;
