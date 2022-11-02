import Is from "./Is.js";
import {nullish} from "./attributes.js";

const operations = [
  // typeof
  "string", "number", "bigint", "boolean", "symbol", "function",
  "s", "n", "bi", "b", "sb", "f",
  // eq
  "undefined", "null",
  // other types
  "array", "object",
  "a", "o",
  // misc
  "defined", "constructible", "instance", "subclass", "anyOf",
  "sub", "of",
];

const return_nullish = value => nullish(value) ? value : true;

export default value => {
  const is = new Is(value);

  return Object.fromEntries(operations.map(operation =>
    [operation, (...args) => return_nullish(value) && is[operation](...args)]));
};
