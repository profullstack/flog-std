import printer from "module.so";
import formatter from "formatter.js";

/*
 * @implements https://console.spec.whatrg.org/#logger
 */
const logger = (logLevel, args) => {
  // 1
  if (args.length === 0) {
    return;
  }
  // 2, 3
  const [first, ...rest] = args;

  printer(logLevel,
    rest.length === 0
    // 4
    ? [first]
    // 5
    : formatter(args));

  // 6
  return undefined;
};

export default logger;
