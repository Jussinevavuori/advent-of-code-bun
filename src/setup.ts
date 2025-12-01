import fs from "fs";
import path from "path";
import C from "chalk";
import dedent from "dedent";
import { parseArgs } from "util";

/**
 * All templates to scaffold. Use {{ID}} as placeholder for solution ID.
 */
const TEMPLATES: Record<string, string> = {
  "input.txt": "test input for {{ID}}",
  "solution.ts": dedent`
		import { Input } from "../../utils/inputParsers";

		/**
		 * Solution for {{ID}}.
		 * 
		 * @param input  Raw input string
		 * @returns      Result object, automatically printed.
		 */
		export default async function solve(input: string) {
			const lines = Input.toLines(input);
			return { test: lines[0] };
		}
	`,
  "solution.test.ts": dedent`
		import { describe, it, expect } from "bun:test";
		import solve from "./solution";

		export const input = \`
		test input for {{ID}}
		\`.trim();

		describe("{{ID}}", () => {
		  it("works on example", async () => {
		    expect(await solve(input)).toMatchObject({ test: "test input for {{ID}}" });
		  });
		});
	`,
};

await main();

async function main() {
  const solutionId = await getSolutionId();
  console.log(`🎁 Scaffolding ${solutionId}...`);

  // Setup solution directory
  fs.mkdirSync(path.join(__dirname, "..", "solutions", solutionId), {
    recursive: true,
  });

  // Create each template file
  for (const [fileName, template] of Object.entries(TEMPLATES)) {
    const filePath = path.join(
      __dirname,
      "..",
      "solutions",
      solutionId,
      fileName
    );
    const fileContent = template.replace(/{{ID}}/g, solutionId);
    fs.writeFileSync(filePath, fileContent);
    console.log(C.green(` ✅ Created ${fileName}`));
  }
}

/**
 * Get the solution ID from the required --date argument. Must be in YYYY-DD format.
 */
async function getSolutionId() {
  // Parse arguments
  const { values } = parseArgs({
    args: Bun.argv,
    options: { date: { type: "string" } },
    strict: true,
    allowPositionals: true,
  });

  if (!values.date) {
    errorOut("The --date argument is required (format: YYYY-DD)");
  }

  if (!/^\d{4}-\d{2}$/.test(values.date)) {
    errorOut("The --date argument must be in YYYY-DD format");
  }

  return values.date;
}

/**
 * Error out of the program
 */
function errorOut(message: string): never {
  console.log(C.bold.red(message));
  process.exit(0);
}
