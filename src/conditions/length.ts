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
 * @throws TypeError or MinimumLengthError.
 */
function minLength<T extends Length>(value: T, minimum: number,
  message = 'value length less than minimum'): T {

  // verify minimum parameter
  if ('number' !== typeof(minimum)) {
    throw new TypeError('minimum must be a number');
  }

  // verify message parameter
  if ('string' !== typeof(message)) {
    throw new TypeError('message must be a string');
  }

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
 * @throws TypeError or MaximumLengthError.
 */
function maxLength<T extends Length>(value: T, maximum: number,
  message = `value length greater than maximum`): T {

  // verify maximum parameter
  if ('number' !== typeof(maximum)) {
    throw new TypeError('maximum must be a number');
  }

  // verify message parameter
  if ('string' !== typeof(message)) {
    throw new TypeError('message must be a string');
  }

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
 * @throws TypeError, MinimumLengthError or MaximumLengthError.
 */
function lengthBetween<T extends Length>(value: T, minimum: number, maximum: number,
  message = 'value length not between minimum and maximum'): T {

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
