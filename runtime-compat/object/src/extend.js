import {is} from "../../dyndef/exports.js";

const extend = (base = {}, extension = {}) => {
  is(base).object();
  is(extension).object();
  return Object.keys(extension).reduce((result, property) => {
    const value = extension[property];
    return {
      ...result,
      [property]: value?.constructor === Object
        ? extend(base[property], value)
        : value,
    };
  }, base);
};

export default extend;
