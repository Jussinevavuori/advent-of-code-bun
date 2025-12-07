import { Grid, Input, type Pos } from "@/utils/inputParsers";

/**
 * Solution for 2025-07.
 *
 * @param input  Raw input string
 * @returns      Result object, automatically printed.
 */
export default async function solve(input: string) {
  const grid = Input.toGrid(input);
  const startingPos = grid.findFirst("S");

  if (!startingPos) throw new Error("No starting position");

  return {
    part_1: simulateTachyonBeam(startingPos, grid, new Set()),
    part_2: simulateTachyonParticle(
      startingPos.x,
      startingPos.y,
      grid,
      new Map()
    ),
  };
}

function simulateTachyonParticle(
  x: number,
  y: number,
  grid: Grid,
  memo: Map<string, number>
): number {
  // The unmemoized solver function
  function solve() {
    // Out of bounds: Beam completed, count this timeline
    if (!grid.isInBoundsXY(x, y)) return 1;

    // Hit a splitter (2 new timelines)
    if (grid.isInBoundsXY(x, y + 1) && grid.atXY(x, y + 1) === "^") {
      return (
        simulateTachyonParticle(x + 1, y + 1, grid, memo) +
        simulateTachyonParticle(x - 1, y + 1, grid, memo)
      );
    }

    // Move down (no new timelines added)
    return simulateTachyonParticle(x, y + 1, grid, memo);
  }

  // Wrap the solve function with memoization
  const key = Grid.serializeXY(x, y);
  if (memo.has(key)) return memo.get(key)!;
  const result = solve();
  memo.set(key, result);
  return result;
}

function simulateTachyonBeam(
  pos: Pos,
  grid: Grid,
  visited: Set<string>
): number {
  // Out of bounds: Beam completed
  if (!grid.isInBounds(pos)) return 0;

  // Is visited already?
  if (visited.has(Grid.serializePosition(pos))) return 0;

  // Record as visited
  visited.add(Grid.serializePosition(pos));

  // Get next position
  const nextPos = { y: pos.y + 1, x: pos.x };

  // Hit a splitter: Spawn new beams and record a hit
  if (grid.isInBounds(nextPos) && grid.at(nextPos) === "^") {
    return (
      1 +
      simulateTachyonBeam({ y: pos.y + 1, x: pos.x + 1 }, grid, visited) +
      simulateTachyonBeam({ y: pos.y + 1, x: pos.x - 1 }, grid, visited)
    );
  }

  // Move down
  return simulateTachyonBeam(nextPos, grid, visited);
}
