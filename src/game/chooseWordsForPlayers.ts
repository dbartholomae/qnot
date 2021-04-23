import seedrandom from "seedrandom";

export function chooseWordsForPlayers(
  wordList: string[],
  numberOfPlayers: number,
  seed: string
) {
  const result: Array<string | null> = [null];
  if (isEven(numberOfPlayers)) {
    result.push(null);
  }

  const numberOfWordsToAdd = isEven(numberOfPlayers)
    ? numberOfPlayers - 2
    : numberOfPlayers - 1;
  for (let i = 0; i < numberOfWordsToAdd / 2; i++) {
    result.push(wordList[i], wordList[i]);
  }

  const rng = seedrandom(seed);
  return result.sort(() => rng() - 0.5);
}

function isEven(num: number) {
  return num % 2 === 0;
}
