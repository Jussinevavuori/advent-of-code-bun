import { Input } from "@/utils/inputParsers";

/**
 * Solution for 2025-09.
 *
 * @param input  Raw input string
 * @returns      Result object, automatically printed.
 */
export default async function solve(input: string) {
  // Parse as { x, y }[]
  const positions = Input.toLines(input)
    .map((line) => line.split(",").map(Number))
    .map(([x, y]) => ({ x: x!, y: y! }));

  return {
    part_1: getLargestRectangleArea(positions),
    part_2: getLargestRectangleAreaInRedGreen(positions),
  };
}

function getLargestRectangleAreaInRedGreen(
  positions: { x: number; y: number }[]
) {
  let maxArea = 0;

  void positions;

  return maxArea;
}

function getLargestRectangleArea(positions: { x: number; y: number }[]) {
  let maxArea = 0;

  for (let i = 0; i < positions.length - 1; i++) {
    for (let j = i + 1; j < positions.length - 1; j++) {
      const dx = 1 + Math.abs(positions[i]!.x - positions[j]!.x);
      const dy = 1 + Math.abs(positions[i]!.y - positions[j]!.y);
      const area = dx * dy;
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;
}
