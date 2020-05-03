const {
  matchesRegexp,
  RegexpMismatchError
} = require('../src/index');

describe('matchesRegexp', () => {

  describe('valid', () => {

    test.each(
      ['a123a', 'A123A', new String('a123a'), new String('A123A')]
    )('returns input value which match the regexp format', (input) => {
      expect(matchesRegexp(input, /[a-z]\d+[a-z]/i)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined, new Date(), [], {}, 1.1]
    )('throws an error on unmatchable objects', (input) => {
      expect(() => { matchesRegexp(input, /[a-z]/i) }).toThrow(RegexpMismatchError);
    });

    test.each(
      ['abcd', '1234', 'a1b2', new String('abcd')]
    )('throws an error on input values which do not match the regexp format', (input) => {
      expect(() => { matchesRegexp(input, /^\d{2}$/i) }).toThrow(RegexpMismatchError);
    });

    it('defaults to a standard error message', () => {
      expect(() => { matchesRegexp('abcd', /^\d{2}$/i) }).toThrow('value must match regexp');
    });

    it('allows a custom error message to be throw', () => {
      expect(() => { matchesRegexp('abcd', /^\d{2}$/i, 'format mismatch') }).toThrow('format mismatch');
    });

  });

});
