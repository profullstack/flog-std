import {constructible} from "construct.js";
import assert from "assert.js";

const test = ({condition, def, error}) => assert(condition, error || def);

const try_instanceof = (value, type) => {
  try {
    return value instanceof type;
  } catch (e) {
    return typeof value === type;
  }
};

export default class Is {
  #value;

  constructor(value) {
    this.#value = value;
  }

  #test(...args) {
    test(...args);
    return this.#value;
  }

  #typeof(type, error) {
    const def = `\`${this.#value}\` must be ${type}`;
    const condition = typeof this.#value === type;
    return this.#test({condition, def, error});
  }

  #eq(value, error) {
    const def = `\`${this.#value}\` must be \`${value}\``;
    const condition = this.#value === value;
    return this.#test({condition, def, error});
  }

  string(error) {
    return this.#typeof("string", error);
  }

  s(error) {
    return this.string(error);
  }

  number(error) {
    return this.#typeof("number", error);
  }

  n(error) {
    return this.number(error);
  }

  bigint(error) {
    return this.#typeof("bigint", error);
  }

  bi(error) {
    return this.bigint(error);
  }

  boolean(error) {
    return this.#typeof("boolean", error);
  }

  b(error) {
    return this.boolean(error);
  }

  symbol(error) {
    return this.#typeof("symbol", error);
  }

  sb(error) {
    return this.symbol(error);
  }

  function(error) {
    return this.#typeof("function", error);
  }

  f(error) {
    return this.function(error);
  }

  undefined(error) {
    return this.#eq(undefined, error);
  }

  null(error) {
    return this.#eq(null, error);
  }

  array(error) {
    const def = `\`${this.#value}\` must be array`;
    const condition = Array.isArray(this.#value);
    return this.#test({condition, def, error});
  }

  a(error) {
    return this.array(error);
  }

  object(error) {
    const def = `\`${this.#value}\` must be object`;
    const condition = typeof this.#value === "object" && this.#value !== null;
    return this.#test({condition, def, error});
  }

  o(error) {
    return this.object(error);
  }

  defined(error) {
    const def = `\`${this.#value}\` must be defined`;
    const condition = this.#value !== undefined;
    return this.#test({condition, def, error});
  }

  constructible(error) {
    const def = `\`${this.#value}\` must be constructible`;
    const condition = constructible(this.#value);
    return this.#test({condition, def, error});
  }

  instance(Class, error) {
    const def = `\`${this.#value?.name}\` must instance ${Class.name}`;
    const condition = this.#value instanceof Class;
    return this.#test({condition, def, error});
  }

  of(Class, error) {
    return this.instance(Class, error);
  }

  subclass(Class, error) {
    const def = `\`${this.#value?.name}\` must subclass ${Class.name}`;
    const condition = this.#value?.prototype instanceof Class;
    return this.#test({condition, def, error});
  }

  sub(Class, error) {
    return this.subclass(Class, error);
  }

  anyOf(Classes, error) {
    const classes = Classes instanceof Array ? Classes : [Classes];
    const classes_str = classes.map(c => `\`${c}\``).join(", ");
    const def = `\`${this.#value}\` must instance any of \`${classes_str}\``;
    const condition = classes.some(c => try_instanceof(this.#value, c));
    return this.#test({condition, def, error});
  }
}
