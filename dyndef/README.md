# Dyndef: Dynamic Defensive Programming 

## `is`

Verify that a value is of a certain type.

```js
// examples/is.js

import {is} from "std/dyndef";

try {
  // doesn't throw
  is("string").string();
  // throws
  is(true).string();
} catch (error) {
  if (error instanceof TypeError) {
    console.log(error.message);
    // -> `true` must be string
  }
}
```

## `maybe`

Verify that a value is of a certain type, or that it is `undefined` or `null`.

```js
// examples/maybe.js

import {maybe} from "std/dyndef";

try {
  // doesn't throw
  maybe("string").string();
  maybe().string();
  maybe(null).string();
  // throws
  maybe(true).string();
} catch (error) {
  if (error instanceof TypeError) {
    console.log(error.message);
    // -> `true` must be string
  }
}

```

## License

BSD-3-Clause
