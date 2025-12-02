import { Input } from "@/utils/inputParsers";

/**
 * Solution for 2025-02.
 *
 * Approach:
 *  - Loop over each integer in each range
 *  - Use numeric methods to check invalid IDs, avoid strings for efficiency
 *
 * @param input  Raw input string
 * @returns      Result object, automatically printed.
 */
export default async function solve(input: string) {
  // Parse input to { start, end }[]
  const ranges = input.split(",").map((range) => {
    const [start, end] = range.split("-").map((_) => parseInt(_, 10));
    if (!start) throw new Error("Invalid input");
    if (!end) throw new Error("Invalid input");
    return { start, end };
  });

  // Counter
  let invalidIdSum_part1 = 0;
  let invalidIdSum_part2 = 0;

  // Loop over each ID in each range (inclusive)
  for (const { start, end } of ranges) {
    for (let id = start; id <= end; id++) {
      if (isIdInvalid_part1(id)) invalidIdSum_part1 += id;
      if (isIdInvalid_part2(id)) invalidIdSum_part2 += id;
    }
  }

  return { part_1: invalidIdSum_part1, part_2: invalidIdSum_part2 };
}

/**
 * Invalid ID checker for part 2.
 *
 * Similar logic as part 1, but instead we iterate over each power of ten that evenly
 * splits the length of the number and is less than the number (e.g. for 123456 we check 10^1, 10^2,
 * and 10^3) and see if any of those splits yield equal parts.
 */
export function isIdInvalid_part2(id: number) {
  const len = lengthOfNumber(id);

  // Check each possible split point
  split_loop: for (let split = 1; split <= Math.floor(len / 2); split++) {
    // Split must equally divide the number length
    if (len % split !== 0) continue;

    // Check how many parts we would have with this split
    const parts = len / split;

    // Keep track of previous part for comparison
    let previousPart: number | null = null;

    // Check each part by how many parts we would have
    for (let i = 0; i < parts; i++) {
      const part =
        Math.floor(id / Math.pow(10, i * split)) % Math.pow(10, split);

      if (previousPart === null) {
        // First part, just store it
        previousPart = part;
      } else if (previousPart !== part) {
        // Parts don't match, this split is valid, try next split
        continue split_loop;
      } else {
        // Parts match, continue checking
        previousPart = part;
      }
    }

    // All parts matched, this ID is invalid
    return true;
  }

  // No splits yielded equal parts, this ID is valid
  return false;
}

/**
 * Invalid ID checker for part 1.
 *
 * Check if an ID is invalid := matches format {A}{A} where A is a series of any digits.
 * No leading zeroe allowed.
 *
 * Given 1212, it's invalid as 1212 % 10^2 = 12 and 1212 / 10^2 = 12. To find the right
 * power of ten, we can use the length of the number divided by two. If it is uneven,
 * the number is always valid (as the two halves can't be equal).
 */
function isIdInvalid_part1(id: number) {
  // Get length of number, e.g. 123 => 3
  const len = lengthOfNumber(id);

  // If length is odd, can't be invalid
  if (len % 2 !== 0) return false;

  // Calculate the correct power of ten
  const tenPower = Math.pow(10, len / 2);

  // Split number in half and compare
  const firstHalf = Math.floor(id / tenPower);
  const secondHalf = id % tenPower;
  return firstHalf === secondHalf;
}

/**
 * Logarithmic way to calculate length of a number without strings.
 */
function lengthOfNumber(n: number) {
  return Math.floor(Math.log10(Math.abs(n))) + 1;
}
