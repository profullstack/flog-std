import {is} from "dyndef";

try {
  // doesn't throw
  is("string").string();
  // throws
  is(true).string();
} catch (error) {
  if (error instanceof TypeError) {
    console.log(error.message);
    // -> `true` must be of type string
  }
}
