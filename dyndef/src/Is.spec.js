import {Test} from "debris";
import Is from "./Is.js";

const test = new Test();

const fixtures = {
  string: ["", String()],
  number: [0, Number(0)],
  bigint: [0n],
  boolean: [true, false],
  symbol: [Symbol("symbol")],
  function: [() => undefined, function() { return undefined; }],
  null: [null],
  undefined: [undefined],
};

const entries = Object.entries(fixtures);

test.case("non objects", assert => {
  entries.forEach(([key, values]) => {
    const non_values = entries.filter(entry => entry[0] !== key)
      .flatMap(([, value]) => value);
    values.forEach(value => {
      assert(new Is(value)[key]()).equals(value);
      non_values.forEach(non_value =>
        assert(() => new Is(non_value)[key]()).throws())
    });
  });
});

export default test;
