import { minLength, MinimumLengthError } from '../src/index';

describe('minLength', () => {

  describe('valid', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4)]
    )('returns input value longer than condition', (input) => {
      expect(minLength(input, 3)).toBe(input);
    });

  });

  describe('boundary', () => {

    test.each(
      ['abc', [1, 2, 3], Buffer.alloc(3)]
    )('returns input value same length as condition', (input) => {
      expect(minLength(input, 3)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      ['ab', [1, 2], Buffer.alloc(2), null, undefined]
    )('returns input value longer than condition', (input) => {
      expect(() => { minLength(input, 3) }).toThrow(MinimumLengthError);
    });

  });

  describe('extreme', () => {

    it('handles long input data without issue', () => {
      const input = '*'.repeat(Math.pow(2, 24));
      expect(minLength(input, 4)).toBe(input);
    });

  });

});
