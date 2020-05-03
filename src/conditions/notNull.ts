class NullValueError extends Error {
}

/**
 * Condition asserts that value is not null or undefined.
 *
 * @param value - Value on which to run the condition.
 * @param message - Override message to be thrown on failure.
 * @returns Value on passing the condition.
 * @throws TypeError or NullValueError.
 */
function notNull<T>(value: T, message = 'value must not be null'): T {

  // verify config params
  if ('string' !== typeof(message)) {
    throw new TypeError('message must be a string');
  }

  // strict check on both values covered by condition
  if (null === value || undefined === value) {
    throw new NullValueError(message);
  }

  return value;

}

export {
  notNull,
  NullValueError
}
