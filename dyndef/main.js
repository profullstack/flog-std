import Is from "src/Is.js"

const is = value => new Is(value);
const defined = (value, error) => is(value).defined(error);

export {is, defined};
export {default as maybe} from "src/maybe.js";
export {default as assert} from "src/assert.js";
export {constructible, inconstructible_function} from "src/construct.js";
export {numeric, boolish, nullish} from "src/attributes.js";
