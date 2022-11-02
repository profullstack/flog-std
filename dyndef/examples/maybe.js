import {maybe} from "dyndef";

try {
  // doesn't throw
  maybe("string").string();
  maybe().string();
  maybe(null).string();
  // throws
  maybe(true).string();
} catch (error) {
  if (error instanceof TypeError) {
    console.log(error.message);
    // -> `true` must be of type string
  }
}
