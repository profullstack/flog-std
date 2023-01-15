*This API is a stub and not implemented yet.*

# Timers API

```js
import {setTimeout} from "std/timers";
import console from "std/console";

setTimeout(() => {
  console.log("world!");
}, 1000);

console.log("Hello,");
```

## Spec

This standard library module implements the [WHATWG Timers API][spec].

## License

MIT

[spec]: https://html.spec.whatwg.org/timers-and-user-prompts.html#timers
