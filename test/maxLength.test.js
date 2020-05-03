const {
  maxLength,
  MaximumLengthError
} = require('../src/index');

describe('maxLength', () => {

  describe('valid', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4), { length: 4 }]
    )('returns input values with length less than condition', (input) => {
      expect(maxLength(input, 5)).toBe(input);
    });

  });

  describe('boundary', () => {

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4), { length:4 }]
    )('returns input values with length equal to condition', (input) => {
      expect(maxLength(input, 4)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined, {}, new Object(), 1.1]
    )('throws an error on objects without length', (input) => {
      expect(() => { maxLength(input, 5) }).toThrow(MaximumLengthError);
    });

    test.each(
      ['abcd', [1, 2, 3, 4], Buffer.alloc(4), { length: 4 }]
    )('throws an error on input values with length greater than condition', (input) => {
      expect(() => { maxLength(input, 3) }).toThrow(MaximumLengthError);
    });

    it('defaults to a standard error message', () => {
      expect(() => { maxLength('abcd', 3) }).toThrow('value length greater than maximum');
    });

    it('allows a custom error message to be throw', () => {
      expect(() => { maxLength('abcd', 3, 'maximum three') }).toThrow('maximum three');
    });

    it('throws an error if a non numeric minimum is provided', () => {
      expect(() => { maxLength('abcd', new Object()) }).toThrow(TypeError);
    });

    it('throws an error if a non string error message is provided', () => {
      expect(() => { maxLength('abcd', 5, new Object()) }).toThrow(TypeError);
    });

  });

  describe('extreme', () => {

    it('handles long input values without failure', () => {
      const input = '*'.repeat(Math.pow(2, 23));
      expect(maxLength(input, Math.pow(2, 23) + 1)).toBe(input);
    });

  });

});
