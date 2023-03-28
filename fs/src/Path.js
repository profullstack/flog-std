import {join, resolve, dirname, basename, extname} from "path.so";
import {assert, is, defined} from "std/dyndef";
import File from "File.js";

const file_prefix = 7;
const parse = p => p.startsWith("file://") ? p.slice(file_prefix) : p;

export default class Path {
  constructor(...paths) {
    const [path] = paths;
    defined(path);
    return paths.length === 1 ? this.#new1(path) : this.#newN(...paths);
  }

  #new1(path) {
    is(path).anyOf(["string", Path, File]);
    this.path = parse(path?.path ?? path);
    return this;
  }

  #newN(...paths) {
    assert(paths.length > 1);
    const [path, ...more] = paths;
    this.#new1(path);
    return this.join(...more);
  }

  join(...paths) {
    const path = join(this.path, paths[0]?.path ?? paths[0]);
    return paths.length === 1
      ? new Path(path)
      : new Path(path, ...paths.slice(1));
  }

  get directory() {
    return new Path(dirname(this.path));
  }

  static directory(path) {
    return new Path(path).directory;
  }

  get name() {
    return basename(this.path);
  }

  get base() {
    return basename(this.path, this.extension);
  }

  get extension() {
    return extname(this.path);
  }

  get file() {
    return new File(this.path);
  }

  is(pattern) {
    is(pattern).of(RegExp);

    return pattern.test(this.path);
  }

  static is(path, pattern) {
    return new Path(path).is(pattern);
  }

  static resolve(...paths) {
    return new Path(resolve(...paths));
  }
}
