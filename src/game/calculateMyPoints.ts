import { curry, groupBy, mapObjIndexed, omit, values } from "ramda";
import { v4 as uuid } from "uuid";
import { Player } from "./Player";

const QUESTION_MARK = "QUESTION_MARK" + uuid();

export function calculateMyPoints(me: Player, players: Player[]) {
  const teamsByWords = getTeamsByWords(players);

  let points = 0;
  points += countGuessedTeams(me, teamsByWords);
  points -= countGuessedQuestionMarks(me, teamsByWords);

  if (me.word === null) {
    points += countOthersGuessingMe(me, players);
  } else {
    points += calculateMyPointsInTeam(me, players);
  }
  return points;
}

function getTeamsByWords(players: Player[]) {
  return mapObjIndexed(
    (players) => players.map((player) => player.id),
    groupBy<Player, string>((player) => player.word ?? QUESTION_MARK, players)
  );
}

const hasGuessedTeam = curry(
  (firstPlayerId: Player["id"], secondPlayerId: Player["id"], player: Player) =>
    player.guesses.some(
      (guess) => guess.includes(firstPlayerId) && guess.includes(secondPlayerId)
    )
);

function countGuessedTeams(
  me: Player,
  teamsByWords: { [id: string]: string[] }
) {
  const otherTeams = values(
    omit([QUESTION_MARK, ...(me.word ? [me.word] : [])], teamsByWords)
  );
  return otherTeams.filter((team) => hasGuessedTeam(team[0], team[1], me))
    .length;
}

function countGuessedQuestionMarks(
  me: Player,
  teamsByWords: { [p: string]: string[] }
) {
  const isOtherQuestionMark = (id: Player["id"]) =>
    id !== me.id && teamsByWords[QUESTION_MARK].includes(id);
  return me.guesses.flat().filter(isOtherQuestionMark).length;
}

function calculateMyPointsInTeam(me: Player, players: Player[]): number {
  let points = 0;
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

function countOthersGuessingMe(me: Player, players: Player[]) {
  const guessesByOtherPlayers = players
    .filter((player) => player.id !== me.id)
    .flatMap((player) => player.guesses);
  return guessesByOtherPlayers.filter((guess) => guess.includes(me.id)).length;
}
