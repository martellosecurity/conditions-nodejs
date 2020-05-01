class NullValueError extends Error {
}

/**
 * Condition asserts that value is not null or undefined.
 *
 * @param value - Required value on which to run the condition.
 * @param message - Optional custom message to be thrown on failure.
 * @returns Original value it it meets the condition.
 * @throws NullValueError if value fails to meet the condition.
 */
function notNull<T>(value: T, message = 'value must not be null'): T {

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
