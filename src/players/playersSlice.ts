import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { selectName } from "../name";
import { Player } from "./Player";

type PlayersState = Player[];

const initialState: PlayersState = [];

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
});

export const selectPlayers = (state: RootState) =>
  [{ name: selectName(state), isOnline: true }].concat(state.players);

export const reducer = playersSlice.reducer;
