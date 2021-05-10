import { usePlayers } from "../../business-logic/players";
import { useDispatch } from "../../business-logic/useDispatch";
import { startGame as startGameAction } from "../../business-logic/game/gameSlice";
import words from "../../wordLists/german.json";

export function useStartGame() {
  const players = usePlayers();
  const dispatch = useDispatch();

  return function startGame() {
    dispatch(
      startGameAction({
        players,
        wordList: words,
      })
    );
  };
}
