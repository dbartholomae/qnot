import { v4 as uuid } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Guess, Player } from "./Player";
import { chooseWordsForPlayers } from "./chooseWordsForPlayers";
import { selectId } from "../me/meSlice";

interface GameState {
  myWord: string | null;
  players: Player[];
  seed: string;
  status: Status;
  wordList: string[];
}

export enum Status {
  WaitingForGameStart = "WaitingForGameStart",
  ChoosingFirstDescription = "ChoosingFirstDescription",
  GuessingTeams = "GuessingTeams",
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
    startGame: (
      state,
      { payload: { players, seed, wordList } }: PayloadAction<GameConfig>
    ) => {
      const randomWords = chooseWordsForPlayers(wordList, players.length, seed);

      return {
        ...state,
        players: players.map((player, index) => ({
          ...player,
          word: randomWords[index],
        })),
        seed,
        status: Status.ChoosingFirstDescription,
        wordList,
      };
    },
    addDescriptionToPlayer: (
      state,
      {
        payload: { description, id },
      }: PayloadAction<{ description: string; id: Player["id"] }>
    ) => {
      const playerToUpdate = state.players.find((player) => player.id === id);
      if (playerToUpdate === undefined) {
        return;
      }
      playerToUpdate.descriptions.push(description);
      if (state.players.every((player) => player.descriptions.length === 1)) {
        state.status = Status.GuessingTeams;
      }
    },
    addGuessToPlayer: (
      state,
      {
        payload: { guess, id },
      }: PayloadAction<{
        guess: Guess;
        id: Player["id"];
      }>
    ) => {
      const playerToUpdate = state.players.find((player) => player.id === id);
      if (playerToUpdate === undefined) {
        return;
      }
      playerToUpdate.guesses.push(guess);
    },
  },
});

export const { reducer } = gameSlice;

export const {
  addGuessToPlayer,
  addDescriptionToPlayer,
  startGame,
} = gameSlice.actions;

export function selectMyWord(state: RootState) {
  return state.game.players.find((player) => player.id === selectId(state))
    ?.word;
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
