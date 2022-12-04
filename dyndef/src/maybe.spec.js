import {Test} from "debris";
import maybe from "maybe.js";

const test = new Test();

test.case("nullish", assert => {
  assert(maybe(undefined).n()).undefined();
  assert(maybe(null).s()).equals(null);
});

test.case("non-nullish", assert => {
  assert(maybe(0).n()).equals(0);
  assert(maybe("0").s()).equals("0");
});

export default test;
