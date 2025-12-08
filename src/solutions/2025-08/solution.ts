import { Input } from "@/utils/inputParsers";

/**
 * Solution for 2025-08.
 *
 * @param input  Raw input string
 * @returns      Result object, automatically printed.
 */
export default async function solve(input: string) {
  // Parse boxes to {x,y,z}[]
  const boxes = Input.toLines(input)
    .map((line) => line.split(",").map((_) => parseInt(_, 10)))
    .map((values) => ({ x: values[0]!, y: values[1]!, z: values[2]! }));

  return { part_1: solvePart1(boxes), part_2: solvePart2(boxes) };
}

type Box = { x: number; y: number; z: number };

/**
 * Product of 3 largest circuits after set amount of connections?
 */
function solvePart1(boxes: Box[]) {
  // Different connections count with real and test data
  const connectionsCount = boxes.length === 1000 ? 1000 : 10;

  // Make required connections
  const { connections } = makeConnections(boxes, connectionsCount);

  // Get circuit sizes (assume sorted largest to smallest)
  const circuits = getCircuitSizes(boxes, connections);

  // Return product of 3 largest circuits
  return circuits[0]! * circuits[1]! * circuits[2]!;
}

/**
 * Product of X coordinates of last boxes to connect to make one circuit
 */
function solvePart2(boxes: Box[]) {
  // Setup bounds for how many connections can exist
  let min = boxes.length - 1;
  let max = boxes.length * (boxes.length - 1);

  // Record whether fully connected for each connectionsCount
  const results = new Map<number, boolean>();

  // Utility function to calculate result when correct n found
  function getResult(n: number) {
    // Re-calculate with smallest connectionsCount to fully connect
    const { lastConnection } = makeConnections(boxes, n);

    // Result
    return boxes[lastConnection.a]!.x * boxes[lastConnection.b]!.x;
  }

  // Keep running binary search
  while (min < max) {
    // Binary search from center
    let n = min + Math.floor((max - min) / 2);
    console.log(n);

    const { connections } = makeConnections(boxes, n);
    console.log("> Connections made");
    const circuitSizes = getCircuitSizes(boxes, connections);
    console.log("> Circuits calculated");
    const isValid = circuitSizes.length === 1;
    results.set(n, isValid);
    console.log("> Validity:", isValid);

    // Fully connected, but not with one less: This is the correct connections count
    if (isValid && results.get(n - 1) === false) return getResult(n);

    // Not fully connected, but is with one more: That is the correct connections count
    if (!isValid && results.get(n + 1) === true) return getResult(n + 1);

    // Set new binary search limits and continue iteration
    if (isValid) {
      max = n;
    } else {
      min = n;
    }
  }
}

/**
 * Given a set of boxes, makes the `connectionsCount` shortest connections. Returns the
 * map of connections as well as the data of the latest made connection.
 */
function makeConnections(boxes: Box[], connectionsCount: number) {
  // Keep track of previous min distance
  let prev = { distance: 0, a: -1, b: -1 };

  // Double-record all connections
  const connections = new Map<number, number[]>();

  // Find the `connectionsCount` shortest connections
  for (let i = 0; i < connectionsCount; i++) {
    // Tracker for next smallest connection
    let next = { distance: Number.POSITIVE_INFINITY, a: -1, b: -1 };

    // Loop over each box index pair { a, b }, where a < b
    for (let a = 0; a < boxes.length - 1; a++) {
      for (let b = a + 1; b < boxes.length; b++) {
        const A = boxes[a]!;
        const B = boxes[b]!;

        // Get distance (square distance is enough for ordering)
        const distance =
          (A.x - B.x) * (A.x - B.x) +
          (A.y - B.y) * (A.y - B.y) +
          (A.z - B.z) * (A.z - B.z);

        // If prevmin < distance < nextmin, record this as the next minimum
        if (prev.distance < distance && distance < next.distance) {
          next = { distance, a, b };
        }
      }
    }

    // Next min pair found, record as prev min and make connection (double-sided)
    prev = next;
    connections.set(next.a, [...(connections.get(next.a) ?? []), next.b]);
    connections.set(next.b, [...(connections.get(next.b) ?? []), next.a]);
  }

  return { connections, lastConnection: prev };
}

/**
 * Given a set of connections, automatically calculates all circuit sizes
 */
function getCircuitSizes(boxes: Box[], connections: Map<number, number[]>) {
  // Keep track of visited nodes
  const visited = new Set<number>();

  // Seen circuit sizes
  const circuitSizes: number[] = [];

  // Attempt starting traversal from each node
  for (let i = 0; i < boxes.length; i++) {
    // Already visited?
    if (visited.has(i)) continue;
    visited.add(i);

    // Get connections from i as start of stack for DFS
    const stack = connections.get(i) ?? [];

    // Circuit contents (acts as "visited")
    const circuit = new Set<number>([i]);

    // Start traversing circuit using DFS
    while (stack.length > 0) {
      const node = stack.pop()!;
      if (circuit.has(node)) continue;
      circuit.add(node);
      visited.add(node);
      stack.push(...(connections.get(node) ?? []));
    }

    // Record circuit size
    circuitSizes.push(circuit.size);
  }

  // Sort largest first
  return circuitSizes.sort((a, b) => b - a);
}
