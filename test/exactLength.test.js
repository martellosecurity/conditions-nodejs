const {
  exactLength,
  ExpectedLengthError
} = require('../src/index');

describe('exactLength', () => {

  describe('valid', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4), { length: 4 }]
    )('returns input values with length equal to condition', (input) => {
      expect(exactLength(input, 4)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined, {}, new Object(), 1.1]
    )('throws an error on objects without length', (input) => {
      expect(() => { exactLength(input, 1) }).toThrow(ExpectedLengthError);
    });

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4), { length: 4 }]
    )('throws an error on input values with length greater than condition', (input) => {
      expect(() => { exactLength(input, 3) }).toThrow(ExpectedLengthError);
    });

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4), { length: 4 }]
    )('throws an error on input values with length less than condition', (input) => {
      expect(() => { exactLength(input, 5) }).toThrow(ExpectedLengthError);
    });

    it('defaults to a standard error message', () => {
      expect(() => { exactLength('abcd', 3) }).toThrow('value length did not match expected length');
    });

    it('allows a custom error message to be throw', () => {
      expect(() => { exactLength('abcd', 3, 'exactly three') }).toThrow('exactly three');
    });

    it('throws an error if a non numeric expected length is provided', () => {
      expect(() => { exactLength('abcd', new Object()) }).toThrow(TypeError);
    });

    it('throws an error if a non string error message is provided', () => {
      expect(() => { exactLength('abcd', 4, new Object()) }).toThrow(TypeError);
    });

  });

  describe('extreme', () => {

    it('handles long input values without failure', () => {
      const input = '*'.repeat(Math.pow(2, 23));
      expect(exactLength(input, Math.pow(2, 23))).toBe(input);
    });

  });

});
