import { describe, it, expect } from "bun:test";
import solve from "./solution";

export const input = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`.trim();

describe("2025-05", () => {
  it("works on example in part 1", async () => {
    expect(await solve(input)).toMatchObject({ part_1: 3 });
  });
  it("works on example in part 2", async () => {
    expect(await solve(input)).toMatchObject({ part_2: 14 });
  });
});
