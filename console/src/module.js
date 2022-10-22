import logger from "logger.js";

const console = {
  // 1.1 Logging functions
  
  // 1.1.1
  assert(condition = false, ...data) {
    // 1
    if (condition) {
      return;
    }

    // 2
    const message = "Assertion failed";

    // 3
    if (data.length === 0) {
      data.push(message);
    }

    // 4.1
    const [first] = data;

    // 4.2
    if (typeof first !== "string") {
      data.unshift(message);
    }

    // 4.3.1
    const concat = `${message}: `;

    // 4.3.2
    data[0] = concat;

    // 5
    logger("assert", data);
  },

  // 1.1.2
  clear() {
    // currently noop
  },

  // 1.1.3
  debug(...data) {
    logger("debug", data);
  },

  // 1.1.4
  error(...data) {
    logger("error", data);
  },

  // 1.1.5
  info(...data) {
    logger("info", data);
  },

  // 1.1.6
  log(...data) {
    logger("log", data);
  },

  // 1.1.7
  table (tabularData, properties) {
    // currently noop
  },

  // 1.1.8
  trace(...data) {
    // currently noop
  },

  // 1.1.9
  warn(...data) {
    logger("warn", data);
  },

  // 1.1.10
  dir(item, options) {
    // currently noop
  },

  // 1.1.11
  dirxml(...data) {
    // currently noop
  },
};

export default console;
