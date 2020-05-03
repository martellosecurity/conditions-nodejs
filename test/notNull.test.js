const {
  notNull,
  NullValueError
} = require('../src/index');

describe('notNull', () => {

  describe('valid', () => {

    test.each(
      [true, false, 0, 1.1, 'null', [], {}, new Object(), () => {}]
    )('returns non-null %s input value', (input) => {
      expect(notNull(input)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined]
    )('throws an error on %s input value', (input) => {
      expect(() => { notNull(input) }).toThrow(NullValueError);
    });

    it('defaults to a standard error message', () => {
      expect(() => { notNull(null) }).toThrow('value must not be null');
    });

    it('allows a custom error message to be throw', () => {
      expect(() => { notNull(null, 'no nulls allowed') }).toThrow('no nulls allowed');
    });

    it('throws an error if a non string error message is provided', () => {
      expect(() => { notNull(null, new Object()) }).toThrow(TypeError);
    });

  });

  describe('extreme', () => {

    it('handles long input values without failure', () => {
      const input = '*'.repeat(Math.pow(2, 24));
      expect(notNull(input)).toBe(input);
    });

  });

});
