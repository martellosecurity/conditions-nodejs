class RegexpMismatchError extends Error {
}

/**
 * Condition asserts that value matches specified regexp format.
 *
 * @param value - Value on which to run the condition.
 * @param regexp - Regexp format to match the value against.
 * @param message - Override message to be thrown on failure.
 * @returns Value on passing the condition.
 * @throws RegexpMismatchError on failure.
 */
function matchesRegexp(value: string, regexp: RegExp,
  message = 'value must match regexp'): string {

  // fighting typescript here but need to check for non-ts use
  if (typeof value !== 'string' && !(value as unknown instanceof String)) {
    throw new RegexpMismatchError(message);
  }

  // perform actual test
  if (!regexp.test(value)) {
    throw new RegexpMismatchError(message);
  }

  return value;

}

export {
  matchesRegexp,
  RegexpMismatchError
}
