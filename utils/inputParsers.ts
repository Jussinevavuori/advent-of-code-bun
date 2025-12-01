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
};
