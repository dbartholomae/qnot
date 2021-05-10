import { usePlayers } from "../../business-logic/players";
import { useDispatch } from "../../business-logic/useDispatch";
import { startGame as startGameAction } from "../../business-logic/game/gameSlice";
import createRandomWords from "random-words";
import words from "../../wordLists/german.json";

export function useStartGame() {
  const players = usePlayers();
  const dispatch = useDispatch();

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
