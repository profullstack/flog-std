# Flog Standard Library

This is the Flog standard library.

## Modules

### Console [`std/console`](console/README.md)

Implementation of WHATWG Console API.

### Crypto [`std/crypto`](crypto/README.md)

Implementation of W3C Web Cryptography API.

### Dyndef [`std/dyndef`](dyndef/README.md)

Dynamic defensive programming as per own API.

### Filesystem [`std/filesystem`](filesystem/README.md)

Filesystem operations as per own API.

### Functional [`std/functional`](functional/README.md)

Functional programming as per own API.

### HTTP [`std/http`](http/README.md)

Implementation of a superset of WHATWG Fetch API.

### Math [`std/math`](math/README.md)

Mathematical operations as per own API.

### Streams [`std/streams`](streams/README.md)

Implementation of WHATWG Streams API.

## Runtime Compat

Runtime compat is a Flog standard library implementation for NodeJS. It is
available on NPM as the `runtime-compat` package, and its exports correspond
to Flog standard library modules, allowing for code reuse on both runtimes.

### Flog

```js
import {serve, Response} from "std/http";

serve(() => new Response("plain text", {status: 200}))
```

### NodeJS

```js
import {serve, Response} from "runtime-compat/http";

serve(() => new Response("plain text", {status: 200}))
```
