import { usePlayers } from "../players";
import { useDispatch } from "../store/useDispatch";
import { useHistory } from "../router";
import { startGame as startGameAction } from "../game/gameSlice";
import createRandomWords from "random-words";
import { getGameRoomPath } from "../GameRoomView/getGameRoomPath";

export function useStartGame(roomCode: string) {
  const players = usePlayers();
  const dispatch = useDispatch();
  const { push } = useHistory();

  return function startGame() {
    dispatch(
      startGameAction({
        players,
        seed: (createRandomWords(3) as string[]).join("-"),
        wordList: ["foo", "bar", "baz"],
      })
    );
    push(getGameRoomPath(roomCode));
  };
}
