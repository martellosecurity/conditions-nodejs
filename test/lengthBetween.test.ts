import {
  lengthBetween,
  MinimumLengthError,
  MaximumLengthError
} from '../src/index';

describe('lengthBetween', () => {

  describe('valid', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4)]
    )('returns input value with length between minimum and maximum conditions', (input) => {
      expect(lengthBetween(input, 2, 5)).toBe(input);
    });

  });

  describe('boundary', () => {

    test.each(
      ['ab', [1, 2], Buffer.alloc(2)]
    )('returns input value with length equal to the lower boundary', (input) => {
      expect(lengthBetween(input, 2, 5)).toBe(input);
    });

    test.each(
      ['abcde', [1, 2, 3, 4, 5], Buffer.alloc(5)]
    )('returns input value with length equal to the upper boundary', (input) => {
      expect(lengthBetween(input, 2, 5)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined]
    )('throws an error on objects without length', (input) => {
      expect(() => { lengthBetween(input, 2, 5) }).toThrow(MinimumLengthError);
    });

    test.each(
      ['ab', [1, 2], Buffer.alloc(2)]
    )('throws an error on input values with length less than lower boundary', (input) => {
      expect(() => { lengthBetween(input, 3, 10) }).toThrow(MinimumLengthError);
    });

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4)]
    )('throws an error on input values with length greater than lower boundary', (input) => {
      expect(() => { lengthBetween(input, 1, 3) }).toThrow(MaximumLengthError);
    });

  });

  describe('extreme', () => {

    it('handles long input values without failure', () => {
      const input = '*'.repeat(Math.pow(2, 23));
      expect(lengthBetween(input, 1, Math.pow(2, 23) + 1)).toBe(input);
    });

  });

});
