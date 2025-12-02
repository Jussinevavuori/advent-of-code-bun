import { describe, it, expect } from "bun:test";
import solve from "./solution";

export const input = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`.trim();

describe("2025-01", () => {
  it("works on example in part 1", async () => {
    expect(await solve(input)).toHaveProperty("part_1", 3);
  });
  it("works on example in part 2", async () => {
    expect(await solve(input)).toHaveProperty("part_2", 6);
  });
});
