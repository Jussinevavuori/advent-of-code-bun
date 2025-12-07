/**
 * Input parsing options
 */
export const Input = {
  /**
   * Return input as array of lines. Optionally can keep empty lines.
   */
  toLines(
    input: string,
    options: {
      /**
       * Whether to keep empty lines in the output array. Defaults to false.
       */
      keepEmptyLines?: boolean;

      /**
       * Disable trimming of lines. Defaults to false.
       */
      disableTrim?: boolean;
    } = {}
  ) {
    return input
      .split("\n")
      .map((line) => (options.disableTrim ? line : line.trim()))
      .filter((line) => (options.keepEmptyLines ? true : line.length > 0));
  },

  /**
   * Return input as a grid, where item(row, col) => grid[row][col],
   * or item(y, x) => grid[y][x]. Also has utility functions using the Grid class.
   */
  toGrid(input: string) {
    return new Grid(input);
  },
};

export type Pos = { x: number; y: number };

export class Grid {
  // Row-first
  grid: string[][];

  // Height and width
  H: number;
  W: number;

  constructor(input: string) {
    this.grid = input.split("\n").map((line) => line.split(""));
    this.H = this.grid.length;
    this.W = this.grid[0]!.length;

    // Check grid is square (each row has size W)
    for (const row of this.grid) {
      if (row.length !== this.W) {
        throw new Error("Grid is not square");
      }
    }
  }

  at(pos: Pos): string {
    return this.grid[pos.y]![pos.x]!;
  }

  atXY(x: number, y: number): string {
    return this.grid[y]![x]!;
  }

  findFirst(value: string): Pos | null {
    for (let y = 0; y < this.H; y++) {
      for (let x = 0; x < this.W; x++) {
        if (this.at({ x, y }) === value) {
          return { x, y };
        }
      }
    }

    return null;
  }

  findAll(value: string): Pos[] {
    const positions: Pos[] = [];

    for (let y = 0; y < this.H; y++) {
      for (let x = 0; x < this.W; x++) {
        if (this.at({ x, y }) === value) {
          positions.push({ x, y });
        }
      }
    }

    return positions;
  }

  isInBounds(pos: Pos): boolean {
    return pos.x >= 0 && pos.y >= 0 && pos.x < this.W && pos.y < this.H;
  }

  isInBoundsXY(x: number, y: number) {
    return x >= 0 && y >= 0 && x < this.W && y < this.H;
  }

  static serializePosition(pos: Pos): string {
    return `${pos.x};${pos.y}`;
  }

  static serializeXY(x: number, y: number): string {
    return `${x};${y}`;
  }
}
