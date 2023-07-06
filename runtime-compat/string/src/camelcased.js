import upperfirst from "./upperfirst.js";

export default string => string.split(/[-_]/u)
  .map(part => upperfirst(part)).join("");
