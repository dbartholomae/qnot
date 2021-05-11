import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Guess, Player } from "./Player";
import { chooseWordsForPlayers } from "./chooseWordsForPlayers";
import { selectId } from "../me/meSlice";
import { Status } from "./Status";

interface GameState {
  players: Player[];
  status: Status;
}

const initialState: GameState = {
  players: [],
  status: Status.WaitingForGameStart,
};

interface GameConfig {
  players: Player[];
  wordList: string[];
}

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    joinRoom: (state, { payload: _roomCode }: PayloadAction<string>) => state,
    leaveRoom: (state) => state,
    startGame: {
      reducer: (state, { payload: players }: PayloadAction<Player[]>) => {
        return {
          ...state,
          players,
          status: Status.ChoosingFirstDescription,
        };
      },
      prepare: ({ players, wordList }: GameConfig) => {
        const randomWords = chooseWordsForPlayers(wordList, players.length);
        return {
          payload: players.map((player, index) => ({
            ...player,
            word: randomWords[index],
          })),
        };
      },
    },
    addFirstDescriptionToPlayer: (
      state,
      {
        payload: { description, id },
      }: PayloadAction<{ description: string; id: Player["id"] }>
    ) => {
      const playerToUpdate = state.players.find((player) => player.id === id);
      if (playerToUpdate === undefined) {
        return;
      }
      playerToUpdate.descriptions[0] = description;
      if (state.players.every((player) => player.descriptions.length === 1)) {
        state.status = Status.GuessingFirstTeam;
      }
    },
    addSecondDescriptionToPlayer: (
      state,
      {
        payload: { description, id },
      }: PayloadAction<{ description: string; id: Player["id"] }>
    ) => {
      const playerToUpdate = state.players.find((player) => player.id === id);
      if (playerToUpdate === undefined) {
        return;
      }
      playerToUpdate.descriptions[1] = description;
      if (state.players.every((player) => player.descriptions.length === 2)) {
        state.status = Status.GuessingSecondTeam;
      }
    },
    addFirstGuessToPlayer: (
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
      playerToUpdate.guesses[0] = guess;
      if (state.players.every((player) => player.guesses.length === 1)) {
        state.status = Status.ChoosingSecondDescription;
      }
    },
    addSecondGuessToPlayer: (
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
      playerToUpdate.guesses[1] = guess;
      if (state.players.every((player) => player.guesses.length === 2)) {
        state.status = Status.GameOver;
      }
    },
    startNewRound: {
      reducer: (
        state,
        {
          payload: playersWithWords,
        }: PayloadAction<Pick<Player, "id" | "word">[]>
      ) => ({
        ...state,
        players: state.players.map((player) => ({
          ...player,
          descriptions: [],
          guesses: [],
          word: playersWithWords.find(
            (playerWithWord) => playerWithWord.id === player.id
          )!.word,
        })),
        status: Status.ChoosingFirstDescription,
      }),
      prepare: (players: Pick<Player, "id">[], wordList: string[]) => {
        const randomWords = chooseWordsForPlayers(wordList, players.length);
        return {
          payload: players.map((player, index) => ({
            id: player.id,
            word: randomWords[index],
          })),
        };
      },
    },
  },
});

export const { reducer } = gameSlice;

export const {
  addFirstGuessToPlayer,
  addSecondGuessToPlayer,
  addFirstDescriptionToPlayer,
  addSecondDescriptionToPlayer,
  joinRoom,
  leaveRoom,
  startGame,
  startNewRound,
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
