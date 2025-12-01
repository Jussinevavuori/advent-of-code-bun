import { Input } from "../../utils/inputParsers";

/**
 * Solution for 2025-02.
 *
 * @param input  Raw input string
 * @returns      Result object, automatically printed.
 */
export default async function solve(input: string) {
  const lines = Input.toLines(input);
  return { test: lines[0] };
}
