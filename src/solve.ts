import fs from "fs";
import path from "path";
import C from "chalk";
import { parseArgs } from "util";

await main();

/**
 * Run this file as
 *
 * ```bash
 * $ bun solve          # runs newest solution
 * $ bun solve 2023-05  # runs solution for 5th Dec 2023
 * $ bun solve:watch    # runs newest solution in watch mode
 * ```
 */

/**
 * Main entry point
 */
async function main() {
  const id = await getSolutionId();

  // Clear console and announce
  console.clear();
  console.log();
  console.log(C.bold(`🎁 Solving ${id}...`));
  console.log();
  console.log(C.gray("=".repeat(50)));
  console.log();

  // Fetch input and load the solver module
  const input = await fetchInput(id);
  const solver = await loadSolver(id);

  // Run the solver with the given input
  const start = performance.now();
  const result = await solver(input);
  const durationSeconds = ((performance.now() - start) / 1000).toFixed(3);

  // Log result
  console.log();
  console.log(C.gray("=".repeat(50)));
  console.log();
  console.log(C.bold.green(`✅ Solved ${id} in ${durationSeconds}s:`));
  console.log();
  console.log(result);
}

/**
 * Fetch the input for a given solution
 */
async function fetchInput(id: string) {
  // Path to file
  const inputPath = path.join(__dirname, "..", "solutions", id, "input.txt");

  // Check file exists
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  // Read and return content
  return fs.readFileSync(inputPath, "utf-8");
}

/**
 * Load the solver function for a given solution from the module dynamically. Expects
 * the module to export a default function.
 */
async function loadSolver(id: string) {
  // Path to file
  const modulePath = path.join(__dirname, "..", "solutions", id, "solution.ts");

  // Check file exists
  if (!fs.existsSync(modulePath)) {
    throw new Error(`Solution file not found: ${modulePath}`);
  }

  // Import module dynamically
  const exported = await import(modulePath);

  // Check default export is a function
  if (typeof exported.default !== "function") {
    throw new Error(
      `Solution module does not export a default function: ${id}`
    );
  }

  // Return the solver function
  return exported.default;
}

/**
 * Search available solutions. They are folders that match `./solutions/{year}-{day}`
 * e.g. `./solutions/2023-05`
 */
async function searchSolutions() {
  // Array to hold found solutions
  const solutions: string[] = [];

  // Path to solutions directory
  const solutionsDir = path.join(__dirname, "..", "solutions");
  if (!fs.existsSync(solutionsDir)) {
    return solutions;
  }

  // Read directory entries
  const entries = fs.readdirSync(solutionsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const match = entry.name.match(/^(\d{4})-(\d{2})$/);
      if (match) solutions.push(entry.name);
    }
  }

  // Sort lexicographically to have a consistent order from oldest to newest
  solutions.sort();

  // Return found solutions
  return solutions;
}

/**
 * Parse command line arguments to get year and day.
 *
 * Defaults to newest solution
 */
async function getSolutionId() {
  /**
   * Parse from `--date` argument (YYYY-DD format)
   */
  async function getProvidedSolutionId() {
    // Parse arguments
    const { values } = parseArgs({
      args: Bun.argv,
      options: {
        date: {
          type: "string",
        },
      },
      strict: true,
      allowPositionals: true,
    });

    if (values.date) return values.date;
  }

  /**
   * Get the newest solution available
   */
  async function getDefaultSolutionId() {
    const solutions = await searchSolutions();
    if (solutions.length === 0) {
      throw new Error("No solutions found in ./solutions");
    }
    return solutions[solutions.length - 1]!; // Return the newest solution
  }

  // Check for provided solution id first
  return (await getProvidedSolutionId()) || (await getDefaultSolutionId());
}
