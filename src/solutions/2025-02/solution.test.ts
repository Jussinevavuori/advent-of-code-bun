import { describe, it, expect } from "bun:test";
import solve, { isIdInvalid_part2 } from "./solution";

export const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

describe("2025-02", () => {
  it("works on example in part 1", async () => {
    expect(await solve(input)).toHaveProperty("part_1", 1227775554);
  });
  it("works on example in part 2", async () => {
    expect(await solve(input)).toHaveProperty("part_2", 4174379265);
  });
  it("should correctly detect invalid IDs for part 2", () => {
    expect(isIdInvalid_part2(11)).toBe(true);
    expect(isIdInvalid_part2(22)).toBe(true);
    expect(isIdInvalid_part2(1212)).toBe(true);
    expect(isIdInvalid_part2(3434)).toBe(true);
    expect(isIdInvalid_part2(9999)).toBe(true);
    expect(isIdInvalid_part2(123123)).toBe(true);
    expect(isIdInvalid_part2(456456)).toBe(true);
    expect(isIdInvalid_part2(789789)).toBe(true);
    expect(isIdInvalid_part2(12121212)).toBe(true);
    expect(isIdInvalid_part2(56565656)).toBe(true);
  });
  it("should correctly detect valid IDs for part 2", () => {
    expect(isIdInvalid_part2(12)).toBe(false);
    expect(isIdInvalid_part2(23)).toBe(false);
    expect(isIdInvalid_part2(1234)).toBe(false);
    expect(isIdInvalid_part2(5678)).toBe(false);
    expect(isIdInvalid_part2(123456)).toBe(false);
    expect(isIdInvalid_part2(654321)).toBe(false);
    expect(isIdInvalid_part2(1231231)).toBe(false);
    expect(isIdInvalid_part2(4564564)).toBe(false);
    expect(isIdInvalid_part2(12121213)).toBe(false);
    expect(isIdInvalid_part2(56565657)).toBe(false);
  });
});
