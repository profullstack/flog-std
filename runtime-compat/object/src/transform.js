import {is} from "../../dyndef/exports.js";
import {identity} from "../../function/exports.js";

const {entries: to, fromEntries: from} = Object;

export default (object = {}, transformer = identity) => {
  is(object).object();
  is(transformer).function();
  return from(transformer(to(object)));
};
