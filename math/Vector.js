import {assert, is, every} from "std/dyndef";

export default class Vector {
  #coordinates;

  constructor(...coordinates) {
    every(coordinates).number();
    this.#coordinates = [...coordinates];
  }

  #map(mapper) {
    return new Vector(...this.#coordinates.map(mapper));
  }

  #reduce(reducer, initialValue) {
    return this.#coordinates.reduce(reducer, initialValue);
  }

  get length() {
    return Math.sqrt(this.#reduce((sum, x) => sum + x * x, 0));
  }

  add(other) {
    assert(this.length !== other.length, "vectors must have the same length");
    return this.#map((x, i) => x + other.at(i));
  }

  // dot product
  multiply(by) {
    is(by).instance(Vector);
    return this.#reduce((product, x, i) => product + x * by.at(i), 0);
  }

  at(index) {
    is(index).number();
    return this.#coordinates.at(index);
  }

  toString() {
    return this.#reduce((string, x) => string + `,${x}`, "");
  }
}
