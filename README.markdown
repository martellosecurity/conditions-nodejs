## Conditions for Node.js
Conditions is a library of pre-condition, post-condition and invariant helpers. It exists to support design by contract based approaches to domain models. The fundamental operation of each helper is to perform a specific condition check, returning the input value if the condition passes or throwing an appropriate error if it fails.

If you are unfamiliar with concepts such as conditions, invariants, design by contract, immutability and domain models we suggest reading the [Secure by Design](https://www.martellosecurity.com/kb/design) series of articles on the Martello Security website.

![Integration](https://github.com/martellosecurity/conditions-nodejs/workflows/Integration/badge.svg)

### Condition: `notNull`
Perhaps the most fundamental condition all domain objects should enforce is that their mandatory construction parameters are not null. Javascript has not just the concept of `null` but `undefined` also. The `notNull` function protects against both of these, throwing a `NullValueError` on failure.

```javascript
import { notNull } from '@martellosecurity/conditions';

class MyDomainPrimitive {

  constructor(value) {
    this.value = notNull(value);
  }

}
```

### Condition: `minLength`, `maxLength`
The length of input data is another fundamental condition secure code should enforce. These checks are simple, efficient and should be done prior to any attempts to parse or process the data futher. Many different objects can have length in Javascript such as a `string`, an `array` or a `buffer`.

The `minLength` function verifies that the input value has a length greater than or equal to the specified `minimum` value. On failure a `MinimumLengthError` will be thrown.

The `maxLength` function verifies that the input value has a length less than or equal to the specified `maximum` value. On failure a `MaximumLengthError` will be thrown.

```javascript
import { notNull, minLength } from '@martellosecurity/conditions';

class MyDomainPrimitive {

  constructor(value) {
    notNull(value);
    this.value = minLength(value, 5);
  }

}
