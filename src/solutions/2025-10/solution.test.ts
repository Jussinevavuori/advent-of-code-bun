import { describe, it, expect } from "bun:test";
import solve from "./solution";

export const input = `
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
`.trim();

describe("2025-10", () => {
  it("works on example in part 1", async () => {
    expect(await solve(input)).toMatchObject({ part_1: 7 });
  });
});
