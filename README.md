# Advent of Code

(C) 2025 — Jussi Nevavuori

Bun-based implementation of Advent of Code solutions.

## Usage

### Solving

Run the solution on the `input.txt` contents and log the output.

```bash
# Automatically picks the latest available solution
bun solve

# Specify a date in YYYY-DD format
bun solve --date 2025-05
```

### Testing solutions before submission

Run tests for all solutions.

This is intended for taking example inputs and outputs from problem descriptions and verifying correctness before submission.

```bash
# Test all solutions
bun test

# Test a specific solutions
bun test 2025-01
```

### Scaffolding new solutions

Create a new solution folder with boilerplate files. Includes the solution file, input file, and test file.

```bash
# Scaffold solution for 2025-03
bun scaffold 2025-03
```
