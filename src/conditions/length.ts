interface Length {
  length: number;
}

class MinimumLengthError extends Error {
};

class MaximumLengthError extends Error {
};

function minLength<T extends Length>(value: T, minimum: number, message = `value must have minimum length of ${minimum}`): T {

  // check a length property even exists
  if (null == value?.length || value.length < minimum) {
    throw new MinimumLengthError(message);
  }

  return value;

}

function maxLength<T extends Length>(value: T, maximum: number, message = `value must have maximum length of ${maximum}`): T {

  // check a length property even exists
  if (null == value?.length || value.length > maximum) {
    throw new MaximumLengthError(message);
  }

  return value;

}

export {
  minLength,
  maxLength,
  MinimumLengthError,
  MaximumLengthError
}
