// https://console.spec.whatwg.org/#formatting-specifiers
export default {
  // 6.1
  "%s": element => String(element),
  // 6.2
  "%d": element => typeof element === "symbol" ? NaN : parseInt(element, 10),
  "%i": element => typeof element === "symbol" ? NaN : parseInt(element, 10),
  // 6.3
  "%f": element => typeof element === "symbol" ? NaN : parseFloat(element, 10),
  // 6.4 - 6.6
  // noop, implemetation-specific
  "%o": element => element,
  // noop, implemetation-specific
  "%0": element => element,
  // noop, implemetation-specific
  "%c": element => element,
};
