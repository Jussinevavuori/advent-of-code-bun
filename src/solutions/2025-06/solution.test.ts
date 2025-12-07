import { describe, it, expect } from "bun:test";
import solve from "./solution";

export const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

describe("2025-06", () => {
  it("works on example in part 1", async () => {
    expect(await solve(input)).toMatchObject({ part_1: 4277556 });
  });
  it("works on example in part 2", async () => {
    expect(await solve(input)).toMatchObject({ part_2: 3263827 });
  });
});
