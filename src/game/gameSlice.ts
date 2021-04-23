import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface GameState {
  myWord: string | null;
  status: Status;
}

export enum Status {
  WaitingForGameStart,
  ChoosingFirstDescription,
}

const initialState: GameState = {
  status: Status.WaitingForGameStart,
  myWord: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    startNewRound: (state) => ({
      status: Status.ChoosingFirstDescription,
      myWord: "Test",
    }),
  },
});

export const { startNewRound } = gameSlice.actions;

export function selectMyWord(state: RootState) {
  return state.game.myWord;
}

export const { reducer } = gameSlice;

export function selectStatus(state: RootState) {
  return state.game.status;
}
