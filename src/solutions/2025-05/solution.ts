import { Input } from "@/utils/inputParsers";

/**
 * Solution for 2025-05.
 *
 * @param input  Raw input string
 * @returns      Result object, automatically printed.
 */
export default async function solve(input: string) {
  const { ingredients, freshRanges } = parseInput(input);

  return {
    part_1: ingredients.filter((_) => isFresh(_, freshRanges)).length,
    part_2: countFreshRangeTotal(freshRanges),
  };
}

/**
 * Idea: Iteratively merge ranges until you only have completely
 * non-overlapping ranges remaining.
 */
function countFreshRangeTotal(ranges: [number, number][]) {
  let merges = 0; // Keep track of # of merges for each iteration.

  // Loop until no merges done in last iteration
  do {
    merges = 0; // Reset for next iteration

    // Merge each j to i if possible. Delete j if merged
    for (let i = 0; i < ranges.length - 1; i++) {
      for (let j = i + 1; j < ranges.length; j++) {
        const min_i = ranges[i]![0];
        const max_i = ranges[i]![1];
        const min_j = ranges[j]![0];
        const max_j = ranges[j]![1];

        // No overlap: j to the left of i
        if (max_j < min_i) continue;

        // No overlap: j to the right of i
        if (min_j > max_i) continue;

        // Overlap: Merge
        merges++; // Count merge
        ranges[i] = [Math.min(min_i, min_j), Math.max(max_i, max_j)]; // Merge to i
        ranges.splice(j, 1); // Remove j from ranges

        // Re-iterate with current i and j
        j--;
      }
    }
  } while (merges > 0);

  // Simple sum of sizes of ranges as they are all separate
  return ranges.map(([min, max]) => max - min + 1).reduce((a, b) => a + b, 0);
}

function isFresh(ingredient: number, freshRanges: [number, number][]) {
  return freshRanges.some(([min, max]) => {
    return min <= ingredient && max >= ingredient;
  });
}

function parseInput(input: string) {
  const [freshRangesString, ingredientsString] = input.split("\n\n");
  const freshRangeLines = Input.toLines(freshRangesString!);
  const ingredientLines = Input.toLines(ingredientsString!);

  const ingredients = [] as number[];

  const freshRanges = [] as [number, number][];

  for (const frl of freshRangeLines) {
    const [min, max] = frl.split("-").map(Number);
    freshRanges.push([min!, max!]);
  }

  for (const ing of ingredientLines) {
    if (!ingredients.includes(Number(ing))) {
      ingredients.push(Number(ing));
    }
  }

  return { ingredients, freshRanges };
}
