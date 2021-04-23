import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface GameState {
  myWord: string | null;
  players: Array<unknown>;
  status: Status;
}

export enum Status {
  WaitingForGameStart,
  ChoosingFirstDescription,
}

const initialState: GameState = {
  myWord: null,
  players: [],
  status: Status.WaitingForGameStart,
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    startNewRound: (state) => ({
      ...state,
      status: Status.ChoosingFirstDescription,
      myWord: "Test",
    }),
  },
});

export const { reducer } = gameSlice;

export const { startNewRound } = gameSlice.actions;

export function selectMyWord(state: RootState) {
  return state.game.myWord;
}

export function selectStatus(state: RootState) {
  return state.game.status;
}

export function selectPlayers(state: RootState) {
  return state.game.players;
}
