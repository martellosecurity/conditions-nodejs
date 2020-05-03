const {
  matchesRegExp,
  RegExpMismatchError
} = require('../src/index');

describe('matchesRegExp', () => {

  describe('valid', () => {

    test.each(
      ['a123a', 'A123A', 'abcd12abcd', 'ACDB12ABCD']
    )('returns input values which match the regexp format', (input) => {
      expect(matchesRegExp(input, /[a-z]\d+[a-z]/i)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined, [], {}, new Object(), 1.1]
    )('throws an error on unmatchable non string objects', (input) => {
      expect(() => { matchesRegExp(input, /[a-z]/i) }).toThrow(RegExpMismatchError);
    });

    test.each(
      ['abcd', '1234', 'a1b2', 'A12']
    )('throws an error on input values which do not match the regexp format', (input) => {
      expect(() => { matchesRegExp(input, /^[a-z]\d{2}$/) }).toThrow(RegExpMismatchError);
    });

    it('defaults to a standard error message', () => {
      expect(() => { matchesRegExp('abcd', /^\d{2}$/i) }).toThrow('value does not match regexp format');
    });

    it('allows a custom error message to be throw', () => {
      expect(() => { matchesRegExp('abcd', /^\d{2}$/i, 'format mismatch') }).toThrow('format mismatch');
    });

    it('throws an error if a non RegExp format is provided', () => {
      expect(() => { matchesRegExp('abcd', '^[a-z]+$') }).toThrow(TypeError);
    });

    it('throws an error if a non string error message is provided', () => {
      expect(() => { matchesRegExp('abcd', /^\d{2}$/i, new Object()) }).toThrow(TypeError);
    });

  });

});
