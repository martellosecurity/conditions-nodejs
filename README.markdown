## Conditions for Node.js
Conditions is a library of pre-condition, post-condition and invariant helpers. It exists to support a design by contract based approach to domain models. The fundamental operation of each helper is to perform a specific condition check, returning the input value if the condition passes or throwing an appropriate error if it fails.

If you are unfamiliar with the concepts of conditions, design by contract or domain models we suggest reading the [Secure by Design](https://www.martellosecurity.com/kb/design) series of articles on the Martello Security website.

### The `notNull` Condition
Perhaps the most fundamental condition all domain objects should enforce is that their mandatory construction parameters are not null. Javascript has not just the concept of `null` but of `undefined` also. The `notNull(input)` function protects against both of these, throwing a `NullValueError` on failure.

```javascript
import { notNull } from '@martellosecurity/conditions';

class Example {

  constructor(value) {
    this.value = notNull(value);
  }

}
```