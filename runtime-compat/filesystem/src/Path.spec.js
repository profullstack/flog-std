import Path from "./Path.js";

export default test => {
  test.case("moduleRoot", async assert => {
    assert((await Path.moduleRoot).endsWith("runtime-compat")).true();
  });
};
