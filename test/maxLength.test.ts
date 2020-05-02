import { maxLength, MaximumLengthError } from '../src/index';

describe('maxLength', () => {

  describe('valid', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4)]
    )('returns input values with length shorter than condition', (input) => {
      expect(maxLength(input, 5)).toBe(input);
    });

  });

  describe('boundary', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4)]
    )('returns input values with same length as condition', (input) => {
      expect(maxLength(input, 4)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined, new Date(), {}, 1.1]
    )('throws an error on objects without length', (input) => {
      expect(() => { maxLength(input as string, 5) }).toThrow(MaximumLengthError);
    });

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4)]
    )('throws an error on input values with length longer than condition', (input) => {
      expect(() => { maxLength(input, 3) }).toThrow(MaximumLengthError);
    });

    it('defaults to a standard error message', () => {
      expect(() => { maxLength('abcd', 3) }).toThrow('value must have maximum length of 3');
    });

    it('allows a custom error message to be throw', () => {
      expect(() => { maxLength('abcd', 3, 'maximum three') }).toThrow('maximum three');
    });

  });

  describe('extreme', () => {

    it('handles long input values without failure', () => {
      const input = '*'.repeat(Math.pow(2, 23));
      expect(maxLength(input, Math.pow(2, 23) + 1)).toBe(input);
    });

  });

});
