class RegexpMismatchError extends Error {
}

function matchesRegexp(value: string, regexp: RegExp,
  message = 'value must match regexp'): string {

  // assert type for non-typescript use
  if (typeof value !== 'string' || !regexp.test(value)) {
    throw new RegexpMismatchError(message);
  }

  return value;

}

export {
  matchesRegexp,
  RegexpMismatchError
}
