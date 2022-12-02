*This API is a stub and not implemented yet.*

# Filesystem API

```js
import {File} from "std/filesystem";

// reads the file `input.txt` in the current directory into `file`
const file = await File.read("input.txt");
```

## Spec

*Pseudotypes used in later definitions.*

```
type PathArgument = string | Path | File;
```

### Path

Representation of a filesystem path.

#### constructor(...args: PathArgument[]): Path

Creates a new object. Lazily holds a reference to the file and doesn't perform
any IO operations (or check that the path even exists).

If no arguments are given, the current directory will be used for the path.

#### join(...paths: PathArgument[]): Path

Returns a new path with the given paths appended to current object's path.

```js
new Path("/home/flog").path === new Path("/home").join("flog").path;
```

#### directory: Path
Returns a new path with the directory part of the current object's path as
its path.

```js
new Path("/home/flog").directory.path === new Path("/home").path;
```

#### name: string
Returns the filename part of the current object's path with its extension.

```js
new Path("/home/flog/file.txt").name === "file.txt";
```

#### base: string
Returns the filename part of the current object's path without its extension.

```js
new Path("/home/flog/file.txt").base === "file";
```

#### extension: string
Returns the filename extension part of the current object's path.

```js
new Path("/home/flog/file.txt").extension === "txt";
```

#### is(pattern: RegExp): boolean
Returns whether the current object's path fulfills the given pattern.

#### Path.is(path: PathArgument, pattern: RegExp): boolean
Alias for `new Path(path).is(pattern)`.

#### Path.is(pattern: RegExp): boolean
Alias for `new Path().is(pattern)`.

#### Path.resolve(...paths: string[]): Path
Returns a new path using the resolved paths.

### `File`

Representation of a file object (this can be a file, a directory, a symlink,
etc.).

### License

AGPL3.0
