import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Player } from "./Player";

interface GameState {
  myWord: string | null;
  players: Player[];
  status: Status;
  wordList: string[];
}

export enum Status {
  WaitingForGameStart,
  ChoosingFirstDescription,
}

const initialState: GameState = {
  myWord: null,
  players: [],
  status: Status.WaitingForGameStart,
  wordList: [],
};

interface GameConfig {
  players: Player[];
  wordList: string[];
}

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    startNewRound: (state) => ({
      ...state,
      status: Status.ChoosingFirstDescription,
      myWord: "Test",
    }),
    startGame: (
      state,
      { payload: { players, wordList } }: PayloadAction<GameConfig>
    ) => ({
      ...state,
      players,
      wordList,
    }),
  },
});

export const { reducer } = gameSlice;

export const { startGame, startNewRound } = gameSlice.actions;

export function selectMyWord(state: RootState) {
  return state.game.myWord;
}

export function selectStatus(state: RootState) {
  return state.game.status;
}

export function selectPlayers(state: RootState) {
  return state.game.players;
}

export function selectWordList(state: RootState) {
  return state.game.wordList;
}
