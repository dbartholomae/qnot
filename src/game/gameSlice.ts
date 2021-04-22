import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface GameState {
  myWord: string | null;
}

const initialState: GameState = { myWord: null };

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    startNewRound: (state) => ({
      myWord: "Test",
    }),
  },
});

export const { startNewRound } = gameSlice.actions;

export function selectMyWord(state: RootState) {
  return state.game.myWord;
}

export const { reducer } = gameSlice;
