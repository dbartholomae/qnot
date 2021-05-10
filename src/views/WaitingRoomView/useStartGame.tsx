import { usePlayers } from "../../business-logic/players";
import { useDispatch } from "../../business-logic/useDispatch";
import { useHistory } from "../../services/router";
import { startGame as startGameAction } from "../../business-logic/game/gameSlice";
import createRandomWords from "random-words";
import words from "../../wordLists/german.json";

export function useStartGame(roomCode: string) {
  const players = usePlayers();
  const dispatch = useDispatch();
  const { push } = useHistory();

  return function startGame() {
    dispatch(
      startGameAction({
        players,
        seed: (createRandomWords(3) as string[]).join("-"),
        wordList: words,
      })
    );
  };
}
