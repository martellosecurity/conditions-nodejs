interface Length {
  length: number;
}

class MinimumLengthError extends Error {
};

function minLength<T extends Length>(value: T, minimum: number, message = `value must have minimum length of ${minimum}`): T {
  if (null == value?.length || value.length < minimum) {
    throw new MinimumLengthError(message);
  }
  return value;
}

export {
  minLength,
  MinimumLengthError
}
