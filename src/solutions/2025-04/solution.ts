import { Input } from "@/utils/inputParsers";

/**
 * Solution for 2025-04.
 *
 * @param input  Raw input string
 * @returns      Result object, automatically printed.
 */
export default async function solve(input: string) {
  const lines = Input.toLines(input);
  return {
    part_1: listAccessible(lines).length,
    part_2: removeAllAccessible(lines),
  };
}

function getNeighbours(x: number, y: number) {
  return [
    { nx: x - 1, ny: y },
    { nx: x + 1, ny: y },
    { nx: x, ny: y - 1 },
    { nx: x, ny: y + 1 },
    { nx: x - 1, ny: y - 1 },
    { nx: x + 1, ny: y - 1 },
    { nx: x - 1, ny: y + 1 },
    { nx: x + 1, ny: y + 1 },
  ];
}

function removeAllAccessible(lines: string[]) {
  // Copy lines
  const newLines = lines.map((line) => line.split("").join(""));

  let accessible = listAccessible(lines);

  let n = accessible.length;

  while (accessible.length > 0) {
    for (const { x, y } of accessible) {
      // Remove occupant
      newLines[y] =
        newLines[y]!.substring(0, x) + "." + newLines[y]!.substring(x + 1);
    }

    accessible = listAccessible(newLines);
    n += accessible.length;
  }

  return n;
}

function listAccessible(lines: string[]) {
  const accessible: Array<{ x: number; y: number }> = [];

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < (lines[y]?.length ?? 0); x++) {
      // Only consider positions with "@"
      if (lines[y]?.[x] !== "@") continue;

      // Count occupied neighbours
      const nOccupiedNeighbours = getNeighbours(x, y)
        .map(({ nx, ny }): number => {
          const value = lines[ny]?.[nx];
          if (value === "@") return 1;
          return 0;
        })
        .reduce((a, b) => a + b, 0);

      // If current position is empty and has less than 4 occupied neighbours, it's accessible
      if (nOccupiedNeighbours < 4) {
        accessible.push({ x, y });
      }
    }
  }

  return accessible;
}
