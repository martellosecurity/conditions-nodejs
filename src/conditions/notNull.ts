class NullValueError extends Error {
}

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
