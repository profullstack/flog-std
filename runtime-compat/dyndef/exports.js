import Is from "./Is.js"

const is = value => new Is(value);
const defined = (value, error) => is(value).defined(error);

export {is, defined};
export {default as maybe} from "./maybe.js";
export {default as assert} from "./assert.js";
export {constructible, inconstructible_function} from "./construct.js";
export {numeric, boolish, nullish} from "./attributes.js";
