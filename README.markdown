## Conditions for Node.js
Conditions is a library of pre-condition, post-condition and invariant helpers. It exists to support design by contract based approaches to domain models.

If you are unfamiliar with concepts such as conditions, invariants, design by contract, immutability or domain models we suggest reading the [Secure by Design](https://www.martellosecurity.com/kb/design) series of articles on the Martello Security website.

![Integration](https://github.com/martellosecurity/conditions-nodejs/workflows/Integration/badge.svg)

### Getting Started
Execute the install command for your chosen package manager.
```
npm install --save @martellosecurity/conditions
```
```
yarn add @martellosecurity/conditions
```

Then import the conditions you want to use in your classes and functions.

```javascript
import { notNull, maxLength } from '@martellosecurity/conditions';
```

### TypeScript Support
The project comes complete with definition files that support the type system and enables intellisense in TypeScript editors.

Although vanilla JavaScript is obviously supported, TypeScript is recommended for most projects to avail of the additional safety net of compile time type checking.

### Versioning Policy
The project follows semantic versioning. See [semver.org](https://semver.org/) for more details.

## Usage
The basic operation of all conditions is to make a specific assertion returning the input value if the condition passes or throwing an appropriate error if it fails.

The general function signature is that the input check value comes first, followed by any required configuration and an optional final message parameter.

Providing an invalid configuration parameter (e.g. null instead of a number) will throw a `TypeError`.

By default, any error thrown includes a default message. This can be overridden with the optional final message parameter.

### Null Prevention
_notNull\<T\>(input: T, message?: string): T_

Perhaps the most fundamental condition all functions should enforce is that mandatory parameters are not null.

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

Many different types can have length in Javascript such as a `string`, `array`, `buffer` or even one of your own domain objects. This small family of conditions can be used with any object with a `length` property.

#### minLength
_minLength\<T\>(input: T, minimum: number, message?: string): T_

The `minLength` condition verifies that the input has a length greater than or equal to the specified `minimum` value. On failure a `MinimumLengthError` will be thrown.

#### maxLength
_maxLength\<T\>(input: T, maximum: number, message?: string): T_

The `maxLength` condition verifies that the input value has a length less than or equal to the specified `maximum` value. On failure a `MaximumLengthError` will be thrown.

#### exactLength
_exactLength\<T\>(input: T, expected: number, message?: string): T_

The `exactLength` condition verifies that the input value has a length equal to the specified `expected` value. On failure a `ExpectedLengthError` will be thrown.

#### lengthBetween
_lengthBetween\<T\>(input: T, minimum: number, maximum: number, message?: string): T_

A combined `lengthBetween` condition verifies that the input has a length between both specified `minimum` and `maximum` values (inclusive). 

The minimum length check is performed first and the maximum length check second. On failure a `MinimumLengthError` or `MaximumLengthError` will be thrown depending on which condition fails.

```javascript
import { notNull, lengthBetween } from '@martellosecurity/conditions';

class MyDomainPrimitive {

  constructor(value) {
    notNull(value);
    this.value = lengthBetween(value, 5, 20);
  }

}
```

### Format Matching
After basic conditions such as `notNull` and `maxLength` have been verified, syntactic checks such as the format of parameters can be performed.

#### matchesRegExp
_matchesRegExp(input: string, format: RegExp, message?: string): string_

The `matchesRegExp` condition verifies that the input value matches the specified regexp format. Only primitive `string` input values will be accepted. On failure a `RegExpMismatchError` will be thrown.

```javascript
import * as c from '@martellosecurity/conditions';

class MyDomainPrimitive {

  constructor(value) {
    c.notNull(value);
    c.lengthBetween(value, 5, 20);
    this.value = c.matchesRegExp(value, /^ABC[a-z]+$/);
  }

}
```
