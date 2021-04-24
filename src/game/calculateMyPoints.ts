import { Player } from "./Player";
import { curry, groupBy, mapObjIndexed, omit, values } from "ramda";

const hasGuessedTeam = curry(
  (firstPlayerId: Player["id"], secondPlayerId: Player["id"], player: Player) =>
    player.guesses.some(
      (guess) => guess.includes(firstPlayerId) && guess.includes(secondPlayerId)
    )
);

export function calculateMyPoints(me: Player, players: Player[]) {
  let points = 0;
  const questionMark = "QUESTION_MARK";
  const teamsByWords = mapObjIndexed(
    (players) => players.map((player) => player.id),
    groupBy<Player, string>((player) => player.word ?? questionMark, players)
  );
  const otherTeams = values(
    omit([questionMark, ...(me.word ? [me.word] : [])], teamsByWords)
  );
  const isOtherQuestionMark = (id: Player["id"]) =>
    id !== me.id && teamsByWords[questionMark].includes(id);
  points -= me.guesses.flat().filter(isOtherQuestionMark).length;

  const successfulGuesses = otherTeams.filter((team) =>
    hasGuessedTeam(team[0], team[1], me)
  ).length;
  points += successfulGuesses;

  if (me.word === null) {
    const guessesByOtherPlayers = players
      .filter((player) => player.id !== me.id)
      .flatMap((player) => player.guesses);
    points += guessesByOtherPlayers.filter((guess) => guess.includes(me.id))
      .length;
    return points;
  }
  const partner = players.find(
    (player) => player.word === me.word && player.id !== me.id
  );
  const otherPlayers = players.filter((player) => player.word !== me.word);
  if (partner === undefined) {
    throw new TypeError(`Cannot find second player with word ${me.word}`);
  }

  const guessedUs = hasGuessedTeam(me.id, partner.id);

  if (guessedUs(partner) && guessedUs(me)) {
    points += 3;
  }

  points -= otherPlayers.filter(guessedUs).length;
  return points;
}
