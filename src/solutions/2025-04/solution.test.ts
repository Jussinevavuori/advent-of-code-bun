import { describe, it, expect } from "bun:test";
import solve from "./solution";

export const input = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`.trim();

describe("2025-04", () => {
  it("works on example in part 1", async () => {
    expect(await solve(input)).toMatchObject({ part_1: 13 });
  });
  it("works on example in part 2", async () => {
    expect(await solve(input)).toMatchObject({ part_2: 43 });
  });
});
