import { notNull, NullValueError } from '../src/index';

describe('notNull', () => {

  describe('valid', () => {

    test.each(
      [true, false, 0, 1.1, 'null', [], {}, new Date()]
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
      expect(() => { notNull(null, 'no nulls') }).toThrow('no nulls');
    });

  });

  describe('extreme', () => {

    it('handles long input data without issue', () => {
      const input = '*'.repeat(Math.pow(2, 24));
      expect(notNull(input)).toBe(input);
    });

  });

});
