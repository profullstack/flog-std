import {join, resolve, dirname, basename, extname} from "path";
import {assert, is, defined, maybe} from "dyndef";
import File from "./File.js";
import {lstat, readdir} from "node:fs/promises";

const file_prefix = 7;
const parse = p => p.startsWith("file://") ? p.slice(file_prefix) : p;

export default class Path {
  constructor(...paths) {
    const [path] = paths;
    defined(path);
    return paths.length === 1 ? this.#new1(path) : this.#newN(...paths);
  }

  toString() {
    return this.path;
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

  list(filter = () => true, options = {}) {
    maybe(options).object();
    is(filter).function();

    return readdir(this.path, options).then(paths => paths
      .filter(filter)
      .map(path => new Path(this.path, path)));
  }

  static list(path, filter, options) {
    return new Path(path).list(filter, options);
  }

  async glob(pattern) {
    let paths = await this.list(({name}) => !name.startsWith("."));
    for (const path of paths) {
      if (await path.isDirectory) {
        paths = paths.concat(await path.glob(pattern, options));
      } else if (path.is(new RegExp(pattern, "u"))) {
        paths.push(path);
      }
    }
    return paths;
  }

  static glob(pattern) {
    return new Path(".").glob(pattern);
  }

  get #stats() {
    return lstat(this.path);
  }

  get modified() {
    return this.#stats.then(({mtimeMs}) => Math.round(mtimeMs));
  }

  get exists() {
    return this.#stats.then(() => true, () => false);
  }

  get isFile() {
    return this.exists.then(exists =>
      exists ? this.#stats.then(stats => stats.isFile()) : false);
  }

  get isDirectory() {
    return this.exists.then(exists =>
      exists ? this.#stats.then(stats => stats.isDirectory()) : false);
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
