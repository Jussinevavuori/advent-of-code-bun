import { Input } from "@/utils/inputParsers";

type Column = {
  operation: "+" | "*";
  numbers: number[];
};

/**
 * Solution for 2025-06.
 *
 * @param input  Raw input string
 * @returns      Result object, automatically printed.
 */
export default async function solve(input: string) {
  console.log(parseTransposedColumns(input));

  return {
    part_1: solveColumns(parseColumns(input)),
    part_2: solveColumns(parseTransposedColumns(input)),
  };
}

/**
 * Given a set of columns, perform the final calculation.
 */
function solveColumns(columns: Column[]) {
  let result = 0;

  for (const col of columns) {
    switch (col.operation) {
      case "+": {
        result += col.numbers.reduce((a, b) => a + b, 0);
        break;
      }
      case "*": {
        result += col.numbers.reduce((a, b) => a * b, 1);
        break;
      }
    }
  }

  return result;
}

/**
 * Part 2: Parse into columns { operation, numbers }[] but interpret
 * numbers as written in columns.
 */
function parseTransposedColumns(input: string): Column[] {
  const lines = input.split("\n");

  // Map columns into sets when broken by whitespace only columns.
  // Start with one column.
  const columnSets: string[][] = [[]];

  // For each column in input.
  for (let i = 0; i < lines[0]!.length; i++) {
    // Parse column into string
    const col = lines.map((line) => line[i]!).join("");

    // Start new column set if whitespace only
    if (col.match(/^\s+$/)) {
      columnSets.push([]);
      continue;
    }

    // Add column into latest column set.
    columnSets.at(-1)!.push(col);
  }

  // Map each column set into the correct format
  return columnSets.map((columns) => {
    // Parse operation from first column
    const operation = columns.at(0)!.at(-1) === "*" ? "*" : "+";

    // Take all but last row of each column and parse as number
    const numbers = columns
      .map((col) => col.slice(0, -1))
      .map((str) => parseInt(str, 10));

    // Return operation and numbers
    return { operation, numbers };
  });
}

/**
 * Part 1: Parse into columns { operation, numbers }[] and interpret
 * numbers as written in rows.
 */
function parseColumns(input: string): Column[] {
  const lines = Input.toLines(input).map((line) =>
    line
      .split(/\s+/)
      .filter(Boolean)
      .map((item) => item.trim())
  );

  const columns: Column[] = [];

  const colCount = lines[0]?.length ?? 0;

  for (let col = 0; col < colCount; col++) {
    const operation = lines.at(-1)!.at(col)! === "*" ? "*" : "+";
    const numbers: number[] = [];

    for (let row = 0; row < lines.length - 1; row++) {
      numbers.push(parseInt(lines.at(row)!.at(col)!));
    }

    columns.push({ operation, numbers });
  }

  return columns;
}
