import { minLength, MinimumLengthError } from '../src/index';

describe('minLength', () => {

  describe('valid', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4)]
    )('returns input values with length longer than condition', (input) => {
      expect(minLength(input, 3)).toBe(input);
    });

  });

  describe('boundary', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4)]
    )('returns input values with same length as condition', (input) => {
      expect(minLength(input, 4)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined, new Date(), {}, 1.1]
    )('throws an error on objects without length', (input) => {
      expect(() => { minLength(input as string, 3) }).toThrow(MinimumLengthError);
    });

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4)]
    )('throws an error on input values with length shorter than condition', (input) => {
      expect(() => { minLength(input, 5) }).toThrow(MinimumLengthError);
    });

    it('defaults to a standard error message', () => {
      expect(() => { minLength('abcd', 5) }).toThrow('value must have minimum length of 5');
    });

    it('allows a custom error message to be throw', () => {
      expect(() => { minLength('abcd', 5, 'minimum five') }).toThrow('minimum five');
    });

  });

  describe('extreme', () => {

    it('handles long input values without failure', () => {
      const input = '*'.repeat(Math.pow(2, 24));
      expect(minLength(input, 4)).toBe(input);
    });

  });

});
