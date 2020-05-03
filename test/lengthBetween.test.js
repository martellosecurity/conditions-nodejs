const {
  lengthBetween,
  MinimumLengthError,
  MaximumLengthError
} = require('../src/index');

describe('lengthBetween', () => {

  describe('valid', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4), { length: 4 }]
    )('returns input values with length between minimum and maximum conditions', (input) => {
      expect(lengthBetween(input, 2, 5)).toBe(input);
    });

  });

  describe('boundary', () => {

    test.each(
      ['ab', [1, 2], Buffer.alloc(2), { length: 2 }]
    )('returns input values with length equal to the lower boundary', (input) => {
      expect(lengthBetween(input, 2, 5)).toBe(input);
    });

    test.each(
      ['abcde', [1, 2, 3, 4, 5], Buffer.alloc(5), { length: 5 }]
    )('returns input values with length equal to the upper boundary', (input) => {
      expect(lengthBetween(input, 2, 5)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined, {}, new Object(), 1.1]
    )('throws an error on objects without length', (input) => {
      expect(() => { lengthBetween(input, 2, 5) }).toThrow(MinimumLengthError);
    });

    test.each(
      ['ab', [1, 2], Buffer.alloc(2), { length: 2 }]
    )('throws an error on input values with length less than lower boundary', (input) => {
      expect(() => { lengthBetween(input, 3, 10) }).toThrow(MinimumLengthError);
    });

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4), { length: 4 }]
    )('throws an error on input values with length greater than lower boundary', (input) => {
      expect(() => { lengthBetween(input, 1, 3) }).toThrow(MaximumLengthError);
    });

    it('defaults to a standard error message', () => {
      expect(() => { lengthBetween('abcde', 2, 4) }).toThrow('value length not between minimum and maximum');
    });

    it('allows a custom error message to be throw', () => {
      expect(() => { lengthBetween('abcde', 2, 4, 'min two, max four') }).toThrow('min two, max four');
    });

    it('throws an error if a non numeric minimum is provided', () => {
      expect(() => { lengthBetween('abcde', new Object(), 4) }).toThrow(TypeError);
    });

    it('throws an error if a non numeric maximum is provided', () => {
      expect(() => { lengthBetween('abcde', 2, new Object()) }).toThrow(TypeError);
    });

    it('throws an error if a non string error message is provided', () => {
      expect(() => { lengthBetween('abcde', 2, 4, new Object()) }).toThrow(TypeError);
    });

  });

  describe('extreme', () => {

    it('handles long input values without failure', () => {
      const input = '*'.repeat(Math.pow(2, 23));
      expect(lengthBetween(input, 1, Math.pow(2, 23) + 1)).toBe(input);
    });

  });

});
