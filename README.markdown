## Conditions for Node.js
Conditions is a library of pre-condition, post-condition and invariant helpers. It exists to support design by contract based approaches to domain models.

If you are unfamiliar with concepts such as conditions, invariants, design by contract, immutability or domain models we suggest reading the [Secure by Design](https://www.martellosecurity.com/kb/design) series of articles on the Martello Security website.

![Integration](https://github.com/martellosecurity/conditions-nodejs/workflows/Integration/badge.svg)

### Getting Started
Execute the install command for the package manager your project is using
`npm install --save @martellosecurity/conditions` or `yarn add @martellosecurity/conditions`.

Then import the conditions you want to use in your class or functions.

```javascript
import { notNull, maxLength } from '@martellosecurity/conditions';
```

### TypeScript Support
The project comes complete with definition files that support the type system and enables intellisense in TypeScript editors.

### Versioning Policy
The project follows semantic versioning. See [semver.org](https://semver.org/) for more details.

## Conditions
The basic idea of every condition is to make a very specific assertion returning the input value if the condition passes or throwing an appropriate error if it fails.

The general function signature is that the input check value comes first, followed by any required configuration and an optional final message parameter.

By default, any error thrown includes a default message. This can be overridden with the optional final message parameter.

### Null Prevention
_notNull(input, message?)_

Perhaps the most fundamental condition all domain objects should enforce is that mandatory parameters are not null. 

Javascript includes both a `null` and an `undefined` value. The `notNull` condition protects against both of these, throwing a `NullValueError` on failure.

```javascript
import { notNull } from '@martellosecurity/conditions';

class MyDomainPrimitive {

  constructor(value) {
    this.value = notNull(value);
  }

}
```

### Length Checks
Verifying the length of input parameters (e.g. name or email) is a fundamental condition all code should enforce. These checks are simple, efficient and should be done before any attempt to parse or process the data futher (e.g. before syntactic format checks, etc).

Many different types can have length in Javascript such as a `string`, `array`, `buffer` or even one of your own domain objects. This family of conditions can be used with any object with a length property.

#### minLength
_minLength(input, minimum, message?)_

The `minLength` condition verifies that the input has a length greater than or equal to the specified `minimum` value. On failure a `MinimumLengthError` will be thrown.

#### maxLength
_maxLength(input, maximum, message?)_

The `maxLength` condition verifies that the input value has a length less than or equal to the specified `maximum` value. On failure a `MaximumLengthError` will be thrown.

#### lengthBetween
_lengthBetween(input, minimum, maximum, message?)_

A combined `lengthBetween` condition verifies that the input has a length between both specified `minimum` and `maximum` values (inclusive). 

The minimum length check is performed first and the maximum length check second. On failure a `MinimumLengthError` or `MaximumLengthError` will be thrown depending on which check fails.

```javascript
import { notNull, lengthBetween } from '@martellosecurity/conditions';

class MyDomainPrimitive {

  constructor(value) {
    notNull(value);
    this.value = lengthBetween(value, 5, 20);
  }

}
```
