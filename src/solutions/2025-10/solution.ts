import { Input } from "@/utils/inputParsers";

/**
 * Solution for 2025-10.
 *
 * @param input  Raw input string
 * @returns      Result object, automatically printed.
 */
export default async function solve(input: string) {
  const machines = Input.toLines(input).map((str, i) => new Machine(str, i));

  return {
    part_1: machines
      .map((machine) => getMinPressesToConfigure(machine))
      .reduce((a, b) => a + b, 0),
  };
}

function getMinPressesToConfigure(machine: Machine) {
  const b = machine.buttons.length;
  const sequence = [0];
  while (true) {
    // Increment length of sequence each iteration
    sequence.push(0);
    const n = sequence.length;

    // There are buttons^n sequences and we iterate over all of them
    for (let i = 0; i < Math.pow(b, n); i++) {
      // Set up correct permutation into sequence
      for (let j = 0; j < n; j++) {
        sequence[j] = Math.floor(i / Math.pow(b, j)) % b;
      }

      // Simulate and return if match found
      if (machine.simulateSequence(sequence)) return n;
    }
  }
}

/**
 * Minimal bit array abstraction
 */
class BitArray {
  value: number;

  /**
   * Optionally initialize from array of booleans
   */
  constructor(init: boolean[] = []) {
    this.value = 0;
    for (let i = 0; i < init.length; i++) {
      if (init[i]) this.value |= 1 << i;
    }
  }

  xor(that: BitArray) {
    this.value ^= that.value;
  }

  is(that: BitArray) {
    return this.value === that.value;
  }

  set(value: number) {
    this.value = value;
  }
}

/**
 * Matchine abstraction with parser
 */
class Machine {
  target: BitArray;
  lights: BitArray;
  buttons: BitArray[];
  requirements: number[];
  index: number;

  constructor(input: string, index: number) {
    this.index = index;

    // Parse lights
    const lightMatch = input.match(/^\[([.#]+)\]/)?.[0];
    if (!lightMatch) throw new Error("Invalid light format");
    this.lights = new BitArray();
    this.target = new BitArray(
      lightMatch
        .replace("[", "")
        .replace("]", "")
        .split("")
        .map((c) => c === "#")
    );

    // Parse buttons
    const buttonsMatch = input.match(/(\((\d+,?)+\)\s*)+/)?.[0];
    if (!buttonsMatch) throw new Error("Invalid buttons format");
    this.buttons = buttonsMatch
      .split(/\s+/g)
      .map((str) =>
        str
          .replace("(", "")
          .replace(")", "")
          .split(",")
          .filter(Boolean)
          .map((_) => parseInt(_, 10))
      )
      .filter((indices) => indices.length > 0)
      .map((indices) => {
        return new BitArray(
          Array.from(Array(1 + Math.max(...indices)).keys()).map((i) =>
            indices.includes(i)
          )
        );
      });

    // Parse requirements
    const requirementsMatch = input.match(/\{(\d+,?)+\}$/)?.[0];
    if (!requirementsMatch) throw new Error("Invalid requirements format");
    this.requirements = requirementsMatch
      .replace("{", "")
      .replace("}", "")
      .split(",")
      .map((_) => parseInt(_, 10));
  }

  /**
   * Reset and simulate a sequence (indices of button presses in order)
   */
  simulateSequence(sequence: number[]): boolean {
    // Reset the machine
    this.lights.set(0);

    // Simulate each button press in order
    for (const index of sequence) {
      this.lights.xor(this.buttons[index]!);
    }

    // Return whether lights matches target after sequence
    return this.lights.is(this.target);
  }
}
