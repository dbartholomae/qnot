import { v4 as uuid } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Player } from "./Player";

interface GameState {
  myWord: string | null;
  players: Player[];
  seed: string;
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
  seed: uuid(),
  status: Status.WaitingForGameStart,
  wordList: [],
};

interface GameConfig {
  players: Player[];
  seed: string;
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
      { payload: { players, seed, wordList } }: PayloadAction<GameConfig>
    ) => ({
      ...state,
      players,
      seed,
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

export function selectSeed(state: RootState) {
  return state.game.seed;
}
