class RegExpMismatchError extends Error {
}

/**
 * Condition asserts that value matches specified regexp format.
 *
 * @param value - Value on which to run the condition.
 * @param format - RegExp format to match the value against.
 * @param message - Override message to be thrown on failure.
 * @returns Value on passing the condition.
 * @throws TypeError or RegExpMismatchError.
 */
function matchesRegExp(value: string, format: RegExp,
  message = 'value does not match regexp format'): string {

  // verify format parameter
  if (!(format instanceof RegExp)) {
    throw new TypeError('format must be a regexp');
  }

  // verify message parameter
  if ('string' !== typeof(message)) {
    throw new TypeError('message must be a string');
  }

  // perform actual test
  if ('string' !== typeof(value) || !format.test(value)) {
    throw new RegExpMismatchError(message);
  }

  return value;

}

export {
  matchesRegExp,
  RegExpMismatchError
}
