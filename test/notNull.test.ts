import { notNull } from '../src/index';

describe('notNull', () => {

  describe('valid', () => {

    test.each(
      [true, false, 0, 1.1, 'test', [], {}, new Date()]
    )('returns non-null %s input value', (input) => {
      expect(notNull(input)).toBe(input);
    });

  });

});
