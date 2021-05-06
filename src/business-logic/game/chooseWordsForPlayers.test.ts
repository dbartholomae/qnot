import { assert, integer, property, string } from "fast-check";
import { chooseWordsForPlayers } from "./chooseWordsForPlayers";
import { countBy, identity } from "ramda";

describe("chooseWordsForPlayers", () => {
  const seed = "seed";
  const wordList = Array.from(Array(20)).map((_, index) => `word ${index + 1}`);

  it("returns one word per player", () => {
    assert(
      property(integer(3, 20), (numberOfPlayers) => {
        expect(
          chooseWordsForPlayers(wordList, numberOfPlayers, seed).length
        ).toBe(numberOfPlayers);
      })
    );
  });

  it("returns only words from the wordList and null values", () => {
    assert(
      property(integer(3, 20), (numberOfPlayers) => {
        expect([...wordList, null]).toIncludeAllMembers(
          chooseWordsForPlayers(wordList, numberOfPlayers, seed)
        );
      })
    );
  });

  it("contains each word that is in the list exactly twice", () => {
    assert(
      property(integer(3, 20), (numberOfPlayers) => {
        const words = chooseWordsForPlayers(
          wordList,
          numberOfPlayers,
          seed
        ).filter((word) => word !== null) as string[];
        expect(Object.values(countBy<string>(identity, words))).toSatisfyAll(
          (count) => count === 2
        );
      })
    );
  });

  it("returns the same result when called with the same seed", () => {
    assert(
      property(integer(3, 20), string(), (numberOfPlayers, seed) => {
        const firstResult = chooseWordsForPlayers(
          wordList,
          numberOfPlayers,
          seed
        );
        const secondResult = chooseWordsForPlayers(
          wordList,
          numberOfPlayers,
          seed
        );
        expect(firstResult).toEqual(secondResult);
      })
    );
  });

  it("returns different results for different seeds", () => {
    const numberOfPlayers = 5;
    const firstResult = chooseWordsForPlayers(
      wordList,
      numberOfPlayers,
      "seed-1"
    );
    const secondResult = chooseWordsForPlayers(
      wordList,
      numberOfPlayers,
      "seed-2"
    );
    expect(firstResult).not.toEqual(secondResult);
  });

  describe("with 5 players", () => {
    const numberOfPlayers = 5;

    it("contains exactly one null value", () => {
      const words = chooseWordsForPlayers(wordList, numberOfPlayers, seed);
      const numberOfNullValues = words.reduce(
        (count, element) => (element === null ? count + 1 : count),
        0
      );
      expect(numberOfNullValues).toBe(1);
    });
  });
});
