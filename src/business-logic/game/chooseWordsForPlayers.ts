export function chooseWordsForPlayers(
  wordList: string[],
  numberOfPlayers: number
) {
  const result: Array<string | null> = [null];
  if (isEven(numberOfPlayers)) {
    result.push(null);
  }

  const randomWordlist = wordList.sort(() => Math.random() - 0.5);

  const numberOfWordsToAdd = isEven(numberOfPlayers)
    ? numberOfPlayers - 2
    : numberOfPlayers - 1;
  for (let i = 0; i < numberOfWordsToAdd / 2; i++) {
    result.push(randomWordlist[i], randomWordlist[i]);
  }

  return result.sort(() => Math.random() - 0.5);
}

function isEven(num: number) {
  return num % 2 === 0;
}
