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
