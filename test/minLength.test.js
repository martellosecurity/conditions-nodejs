const {
  minLength,
  MinimumLengthError
} = require('../src/index');

describe('minLength', () => {

  describe('valid', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4), { length: 4 }]
    )(`returns input values with length longer than condition`, (input) => {
      expect(minLength(input, 2)).toBe(input);
    });

  });

  describe('boundary', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4), { length: 4 }]
    )('returns input values with length equal to condition', (input) => {
      expect(minLength(input, 4)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined, {}, new Object(), 1.1]
    )('throws an error on objects without length', (input) => {
      expect(() => { minLength(input, 3) }).toThrow(MinimumLengthError);
    });

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4), { length: 4 }]
    )('throws an error on input values with length less than condition', (input) => {
      expect(() => { minLength(input, 5) }).toThrow(MinimumLengthError);
    });

    it('defaults to a standard error message', () => {
      expect(() => { minLength('abcd', 5) }).toThrow('value length less than minimum');
    });

    it('allows a custom error message to be throw', () => {
      expect(() => { minLength('abcd', 5, 'minimum five') }).toThrow('minimum five');
    });

    it('throws an error if a non numeric minimum is provided', () => {
      expect(() => { minLength('abcd', new Object()) }).toThrow(TypeError);
    });

    it('throws an error if a non string error message is provided', () => {
      expect(() => { minLength('abcd', 3, new Object()) }).toThrow(TypeError);
    });

  });

  describe('extreme', () => {

    it('handles long input values without failure', () => {
      const input = '*'.repeat(Math.pow(2, 24));
      expect(minLength(input, 4)).toBe(input);
    });

  });

});
