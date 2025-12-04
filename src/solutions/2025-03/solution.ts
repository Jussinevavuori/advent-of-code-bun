import { Input } from "@/utils/inputParsers";

/**
 * Solution for 2025-03.
 *
 * @param input  Raw input string
 * @returns      Result object, automatically printed.
 */
export default async function solve(input: string) {
  const banks = Input.toLines(input);

  return {
    part_1: banks
      .map((bank) => maximizeBankJoltage(bank, 2))
      .reduce((a, b) => a + b, 0),
    part_2: banks
      .map((bank) => maximizeBankJoltage(bank, 12))
      .reduce((a, b) => a + b, 0),
  };
}

/**
 * To pick n digits and maximize, always pick largest and left-most number
 * with n-1 digits to the right, then recursively pick n-1 digits from remaining string.
 */
function maximizeBankJoltage(bank: string, batteriesCount: number): number {
  if (batteriesCount <= 0) return 0;

  let maxDigit = -1;
  let maxIndex = -1;

  for (let i = 0; i <= bank.length - batteriesCount; i++) {
    const digit = parseInt(bank[i]!, 10);
    if (digit > maxDigit) {
      maxDigit = digit;
      maxIndex = i;
    }
  }

  return (
    Math.pow(10, batteriesCount - 1) * maxDigit +
    maximizeBankJoltage(bank.slice(maxIndex + 1), batteriesCount - 1)
  );
}
