import { assert, integer, property } from "fast-check";
import { chooseWordsForPlayers } from "./chooseWordsForPlayers";
import { countBy, identity } from "ramda";

describe("chooseWordsForPlayers", () => {
  const wordList = Array.from(Array(20)).map((_, index) => `word ${index + 1}`);

  it("returns one word per player", () => {
    assert(
      property(integer(3, 20), (numberOfPlayers) => {
        expect(chooseWordsForPlayers(wordList, numberOfPlayers).length).toBe(
          numberOfPlayers
        );
      })
    );
  });

  it("returns only words from the wordList and null values", () => {
    assert(
      property(integer(3, 20), (numberOfPlayers) => {
        expect([...wordList, null]).toIncludeAllMembers(
          chooseWordsForPlayers(wordList, numberOfPlayers)
        );
      })
    );
  });

  it("contains each word that is in the list exactly twice", () => {
    assert(
      property(integer(3, 20), (numberOfPlayers) => {
        const words = chooseWordsForPlayers(wordList, numberOfPlayers).filter(
          (word) => word !== null
        ) as string[];
        expect(Object.values(countBy<string>(identity, words))).toSatisfyAll(
          (count) => count === 2
        );
      })
    );
  });

  describe("with 5 players", () => {
    const numberOfPlayers = 5;

    it("contains exactly one null value", () => {
      const words = chooseWordsForPlayers(wordList, numberOfPlayers);
      const numberOfNullValues = words.reduce(
        (count, element) => (element === null ? count + 1 : count),
        0
      );
      expect(numberOfNullValues).toBe(1);
    });
  });
});
