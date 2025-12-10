import { describe, it, expect } from "bun:test";
import solve from "./solution";

export const input = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`.trim();

describe("2025-09", () => {
  it("works on example in part 1", async () => {
    expect(await solve(input)).toMatchObject({ part_1: 50 });
  });
  it("works on example in part 2", async () => {
    expect(await solve(input)).toMatchObject({ part_2: 24 });
  });
});
