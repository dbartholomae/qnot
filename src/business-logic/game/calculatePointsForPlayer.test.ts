/**
 * @jest-environment node
 */

import { MockPlayer } from "./MockPlayer";
import { Player } from "./Player";
import { calculateMyPoints } from "./calculateMyPoints";

describe("calculatePointsForPlayer", () => {
  describe("when I'm in a team", () => {
    it("returns 3 if you only picked yourself and your partner", () => {
      const teamOneWord = "team1";
      const ids = ["id1", "id2", "id3"];
      const players: Player[] = [
        new MockPlayer({
          id: ids[0],
          word: teamOneWord,
          guesses: [
            [ids[0], ids[1]],
            [ids[0], ids[1]],
          ],
        }),
        new MockPlayer({
          id: ids[1],
          word: teamOneWord,
          guesses: [
            [ids[0], ids[1]],
            [ids[0], ids[1]],
          ],
        }),
        new MockPlayer({
          id: ids[2],
          word: null,
          guesses: [
            [ids[0], ids[2]],
            [ids[0], ids[2]],
          ],
        }),
      ];
      expect(calculateMyPoints(players[0], players)).toBe(3);
    });

    it("returns 0 if you only picked yourself and your partner did not pick you", () => {
      const teamOneWord = "team1";
      const ids = ["id1", "id2", "id3"];
      const players: Player[] = [
        new MockPlayer({
          id: ids[0],
          word: teamOneWord,
          guesses: [
            [ids[0], ids[1]],
            [ids[0], ids[1]],
          ],
        }),
        new MockPlayer({
          id: ids[1],
          word: teamOneWord,
          guesses: [
            [ids[2], ids[1]],
            [ids[2], ids[1]],
          ],
        }),
        new MockPlayer({
          id: ids[2],
          word: null,
          guesses: [
            [ids[0], ids[2]],
            [ids[0], ids[2]],
          ],
        }),
      ];
      expect(calculateMyPoints(players[0], players)).toBe(0);
    });

    it("returns 2 if you only picked yourself and your partner, but another player picked you", () => {
      const teamOneWord = "team1";
      const ids = ["id1", "id2", "id3"];
      const players: Player[] = [
        new MockPlayer({
          id: ids[0],
          word: teamOneWord,
          guesses: [
            [ids[0], ids[1]],
            [ids[0], ids[1]],
          ],
        }),
        new MockPlayer({
          id: ids[1],
          word: teamOneWord,
          guesses: [
            [ids[0], ids[1]],
            [ids[0], ids[1]],
          ],
        }),
        new MockPlayer({
          id: ids[2],
          word: null,
          guesses: [
            [ids[0], ids[1]],
            [ids[0], ids[1]],
          ],
        }),
      ];
      expect(calculateMyPoints(players[0], players)).toBe(2);
    });

    it("returns 5 if you picked yourself and your partner and another team", () => {
      const teamOneWord = "team1";
      const teamTwoWord = "team2";
      const ids = ["id1", "id2", "id3", "id4", "id5"];
      const players: Player[] = [
        new MockPlayer({
          id: ids[0],
          word: teamOneWord,
          guesses: [
            [ids[0], ids[1]],
            [ids[2], ids[3]],
          ],
        }),
        new MockPlayer({
          id: ids[1],
          word: teamOneWord,
          guesses: [
            [ids[0], ids[1]],
            [ids[0], ids[1]],
          ],
        }),
        new MockPlayer({
          id: ids[2],
          word: teamTwoWord,
          guesses: [
            [ids[0], ids[2]],
            [ids[0], ids[2]],
          ],
        }),
        new MockPlayer({
          id: ids[3],
          word: teamTwoWord,
          guesses: [
            [ids[0], ids[2]],
            [ids[0], ids[2]],
          ],
        }),
        new MockPlayer({
          id: ids[4],
          word: null,
          guesses: [
            [ids[0], ids[2]],
            [ids[0], ids[2]],
          ],
        }),
      ];
      expect(calculateMyPoints(players[0], players)).toBe(5);
    });

    it("returns -2 if I only picked the question mark twice", () => {
      const teamOneWord = "team1";
      const ids = ["id1", "id2", "id3"];
      const players: Player[] = [
        new MockPlayer({
          id: ids[0],
          word: teamOneWord,
          guesses: [
            [ids[0], ids[2]],
            [ids[0], ids[2]],
          ],
        }),
        new MockPlayer({
          id: ids[1],
          word: teamOneWord,
          guesses: [
            [ids[0], ids[1]],
            [ids[0], ids[1]],
          ],
        }),
        new MockPlayer({
          id: ids[2],
          word: null,
          guesses: [
            [ids[0], ids[2]],
            [ids[0], ids[2]],
          ],
        }),
      ];
      expect(calculateMyPoints(players[0], players)).toBe(-2);
    });
  });

  describe("when I'm the question mark", () => {
    it("returns 4 if both other players picked me twice", () => {
      const teamOneWord = "team1";
      const ids = ["id1", "id2", "id3"];
      const players: Player[] = [
        new MockPlayer({
          id: ids[0],
          word: null,
          guesses: [
            [ids[0], ids[1]],
            [ids[0], ids[1]],
          ],
        }),
        new MockPlayer({
          id: ids[1],
          word: teamOneWord,
          guesses: [
            [ids[0], ids[1]],
            [ids[0], ids[1]],
          ],
        }),
        new MockPlayer({
          id: ids[2],
          word: teamOneWord,
          guesses: [
            [ids[0], ids[2]],
            [ids[0], ids[2]],
          ],
        }),
      ];
      expect(calculateMyPoints(players[0], players)).toBe(4);
    });
  });
});
