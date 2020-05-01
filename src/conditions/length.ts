interface Length {
  length: number;
}

class MinimumLengthError extends Error {
};

class MaximumLengthError extends Error {
};

/**
 * Condition asserts that value has a length greater than or equal to a
 * specified minimum.
 *
 * @param value - Value on which to run the condition.
 * @param minimum - Minimum length of the value.
 * @param message - Override message to be thrown on failure.
 * @returns Value on passing the condition.
 * @throws MinimumLengthError on failure.
 */
function minLength<T extends Length>(value: T, minimum: number,
  message = `value must have minimum length of ${minimum}`): T {

  // check length property even exists
  if (null == value?.length || value.length < minimum) {
    throw new MinimumLengthError(message);
  }

  return value;

}

/**
 * Condition asserts that value has a length less than or equal to a
 * specified maximum.
 *
 * @param value - Value on which to run the condition.
 * @param maximum - Maximum length of the value.
 * @param message - Override message to be thrown on failure.
 * @returns Value on passing the condition.
 * @throws MaximumLengthError on failure.
 */
function maxLength<T extends Length>(value: T, maximum: number,
  message = `value must have maximum length of ${maximum}`): T {

  // check length property even exists
  if (null == value?.length || value.length > maximum) {
    throw new MaximumLengthError(message);
  }

  return value;

}

/**
 * Condition asserts the value has a length greater than or equal to a
 * specified minimum AND less than or equal to a specified maximum.
 *
 * @param value - Value on which to run the condition.
 * @param minimum - Minimum length of the value.
 * @param maximum - Maximum length of the value.
 * @param message - Override message to be thrown on failure.
 * @returns Value on passing the condition.
 * @throws MinimumLengthError or MaximumLengthError on failure.
 */
function lengthBetween<T extends Length>(value: T, minimum: number, maximum: number,
  message = `value must has length between ${minimum} and ${maximum}`): T {

  // delegate to minLength condtion first, maxLength second
  return maxLength(minLength(value, minimum, message), maximum, message);

}

export {
  minLength,
  maxLength,
  lengthBetween,
  MinimumLengthError,
  MaximumLengthError
}
