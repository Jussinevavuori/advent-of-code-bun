import { Input } from "../../utils/inputParsers";

/**
 * Solution for 2025-02.
 *
 * Approach:
 * Simple click-by-click dial turning simulation. Inefficient but simple.
 *
 * @param input  Raw input string
 * @returns      Result object, automatically printed.
 */
export default async function handler(input: string) {
  const lines = Input.toLines(input);

  // Dial properties and state
  const dialSize = 100;
  let dial = 50;

  // Part 1 and Part 2 counters
  let nZeroStops = 0;
  let nZeroClicks = 0;

  // Process each instruction line
  for (const line of lines) {
    // Parse direction and amount
    const direction = line[0];
    const amount = parseInt(line.slice(1), 10);

    // Simulate each dial turning (inefficient but simple)
    for (let i = 0; i < amount; i++) {
      // Turn the dial one step
      dial += direction === "L" ? -1 : +1;

      // Wrap around the dial
      while (dial < 0) dial += dialSize;
      while (dial >= dialSize) dial -= dialSize;

      // Check for passing through 0
      if (dial === 0) nZeroClicks++;
    }

    // Check for stopping at 0
    if (dial === 0) nZeroStops++;
  }

  return { part_1: nZeroStops, part_2: nZeroClicks };
}
