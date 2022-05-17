class SassError extends Error {
  constructor(sassError) {
    super();

    this.name = "SassError";

    if (
      typeof sassError.line !== "undefined" ||
      typeof sassError.column !== "undefined"
    ) {
      this.loc = {
        line: sassError.line,
        column: sassError.column,
      };
    }

    // Keep original error if `sassError.formatted` is unavailable
    this.message = `${this.name}: ${
      typeof sassError.message !== "undefined" ? sassError.message : sassError
    }`;

    if (sassError.formatted) {
      this.message = `${this.name}: ${sassError.formatted.replace(
        /^Error: /,
        ""
      )}`;

      // Instruct webpack to hide the JS stack from the console.
      // Usually you're only interested in the SASS stack in this case.
      this.hideStack = true;

      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default SassError;
