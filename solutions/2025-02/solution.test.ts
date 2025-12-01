import { describe, it, expect } from "bun:test";
import solve from "./solution";

export const input = `
test input for 2025-02
`.trim();

describe("2025-02", () => {
  it("works on example", async () => {
    expect(await solve(input)).toMatchObject({
      test: "test input for 2025-02",
    });
  });
});
