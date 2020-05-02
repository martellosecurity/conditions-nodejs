import { matchesRegexp, RegexpMismatchError } from '../src/index';

describe('matchesRegexp', () => {

  describe('valid', () => {

    test.each(
      ['a123a', 'abcd1234abcd', 'A123A', 'ABCD1234ABCD']
    )('returns input value which match the regexp format', (input) => {
      expect(matchesRegexp(input, /[a-z]\d+[a-z]/i)).toBe(input);
    });

  });

  describe('invalid', () => {

    test.each(
      [null, undefined, new Date(), [], {}, 1.1]
    )('throws an error on unmatchable objects', (input) => {
      expect(() => { matchesRegexp(input as string, /[a-z]/i) }).toThrow(RegexpMismatchError);
    });

    test.each(
      ['abcd', '1234', 'a1b2']
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
