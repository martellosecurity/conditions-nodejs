class NullValueError extends Error {
}

function notNull(value: any, message = 'value cannot be null'): any {
  if (null == value) {
    throw new NullValueError(message);
  }
  return value;
}

export {
  notNull,
  NullValueError
}
