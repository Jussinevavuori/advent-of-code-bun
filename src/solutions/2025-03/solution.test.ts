import { describe, it, expect } from "bun:test";
import solve from "./solution";

export const input = `
987654321111111
811111111111119
234234234234278
818181911112111
`.trim();

describe("2025-03", () => {
  it("works on example in part 1", async () => {
    expect(await solve(input)).toMatchObject({ part_1: 357 });
  });
  it("works on example in part 2", async () => {
    expect(await solve(input)).toMatchObject({ part_2: 3121910778619 });
  });
});
