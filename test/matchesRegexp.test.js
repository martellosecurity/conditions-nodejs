const {
  matchesRegexp,
  RegexpMismatchError
} = require('../src/index');

describe('matchesRegexp', () => {

  describe('valid', () => {

    test.each(
      ['a123a', 'A123A', 'abcd12abcd', 'ACDB12ABCD']
    )('returns input values which match the regexp format', (input) => {
      expect(matchesRegexp(input, /[a-z]\d+[a-z]/i)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined, [], {}, new Object(), 1.1]
    )('throws an error on unmatchable non string objects', (input) => {
      expect(() => { matchesRegexp(input, /[a-z]/i) }).toThrow(RegexpMismatchError);
    });

    test.each(
      ['abcd', '1234', 'a1b2', 'A12']
    )('throws an error on input values which do not match the regexp format', (input) => {
      expect(() => { matchesRegexp(input, /^[a-z]\d{2}$/) }).toThrow(RegexpMismatchError);
    });

    it('defaults to a standard error message', () => {
      expect(() => { matchesRegexp('abcd', /^\d{2}$/i) }).toThrow('value does not match regexp format');
    });

    it('allows a custom error message to be throw', () => {
      expect(() => { matchesRegexp('abcd', /^\d{2}$/i, 'format mismatch') }).toThrow('format mismatch');
    });

    it('throws an error if a non RegExp format is provided', () => {
      expect(() => { matchesRegexp('abcd', '^[a-z]+$') }).toThrow(TypeError);
    });

    it('throws an error if a non string error message is provided', () => {
      expect(() => { matchesRegexp('abcd', /^\d{2}$/i, new Object()) }).toThrow(TypeError);
    });

  });

});
