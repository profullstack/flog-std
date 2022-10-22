import specifiers from "formatting-specifiers.js";

/*
 * @implements https://console.spec.whatrg.org/#formatter
 */
const formatter = args => {
  // 1
  if (args.length === 1) {
    return args;
  }

  // 2, 3
  let [target, current] = args;
  // 4
  const specifier = target.match(/%[sdifoOc]/);

  // 5
  if (specifier === null) {
    return args;
  }

  // 6.1 - 6.6
  const converted = specifiers[specifier](current);
  // 6.7
  target = target.replace(specifier, converted);

  // 7
  const result = [target, ...args.slice(2)];

  // 8
  return formatter(result);
};

export default formatter;
