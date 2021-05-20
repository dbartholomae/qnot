import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Guess, Player } from "./Player";
import { chooseWordsForPlayers } from "./chooseWordsForPlayers";
import { selectId } from "../me/meSlice";
import { Status } from "./Status";
import { calculateMyPoints } from "./calculateMyPoints";
import { PlayerWithPoints } from "./PlayerWithPoints";

export interface GameState {
  connectedToChannel: boolean;
  players: Player[];
  status: Status;
  waitingForSync: boolean;
}

export const initialState: GameState = {
  connectedToChannel: false,
  players: [],
  status: Status.WaitingForGameStart,
  waitingForSync: false,
};

interface GameConfig {
  players: Player[];
  wordList: string[];
}

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    requestGameState: (state) => ({ ...state, waitingForSync: true }),
    syncState: (state, { payload: newState }: PayloadAction<GameState>) => ({
      ...newState,
      waitingForSync: false,
    }),
    joinRoom: (state, { payload: _roomCode }: PayloadAction<string>) => state,
    joinRoomComplete: (
      state,
      { payload: _roomCode }: PayloadAction<string>
    ) => ({
      ...state,
      connectedToChannel: true,
    }),
    leaveRoom: (state) => ({ ...state, connectedToChannel: false }),
    startGame: {
      reducer: (state, { payload: players }: PayloadAction<Player[]>) => {
        return {
          ...state,
          players: players.map((player) => ({ ...player, points: 5 })),
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
      if (state.status !== Status.GuessingSecondTeam) {
        return;
      }
      const playerToUpdate = state.players.find((player) => player.id === id);
      if (playerToUpdate === undefined) {
        return;
      }
      playerToUpdate.guesses[1] = guess;
      if (state.players.every((player) => player.guesses.length === 2)) {
        state.players.forEach(
          (player) =>
            (player.points! += calculateMyPoints(player, state.players))
        );
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
  joinRoomComplete,
  requestGameState,
  syncState,
  startGame,
  startNewRound,
} = gameSlice.actions;

export function selectGameState(state: RootState) {
  return state.game;
}

export function selectMyWord(state: RootState) {
  return selectGameState(state).players.find(
    (player) => player.id === selectId(state)
  )?.word;
}

export function selectStatus(state: RootState) {
  return selectGameState(state).status;
}

export function selectPlayers(state: RootState): PlayerWithPoints[] {
  const players = selectGameState(state).players;
  return players.map((player) => ({
    ...player,
    pointChange: calculateMyPoints(player, players),
  }));
}

export function selectConnectedToChannel(state: RootState) {
  return selectGameState(state).connectedToChannel;
}

export function selectWaitingForSync(state: RootState) {
  return selectGameState(state).waitingForSync;
}
