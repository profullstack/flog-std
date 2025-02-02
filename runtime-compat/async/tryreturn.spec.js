import {identity} from "../function/exports.js";
import tryreturn from "./tryreturn.js";

export default test => {
  test.case("`try` faulty", async assert => {
    try {
      await tryreturn().orelse(identity);
    } catch (error) {
      assert(error.message).equals("`undefined` must be of type function");
    }
  });
  test.case("no `orelse`", async assert => {
    try {
      await tryreturn(async () => 1);
    } catch (error) {
      assert(error.message).equals("`tryreturn` executed without a backup");
    }
  });
  test.case("`orelse` faulty", async assert => {
    try {
      await tryreturn(identity).orelse();
    } catch (error) {
      assert(error.message).equals("`undefined` must be of type function");
    }
  });
  test.case("`try` doesn't throw", async assert => {
    const value2 = await tryreturn(async _ => 0).orelse(async _ => 1);
    assert(value2).equals(0);
  });
  test.case("if throws", async assert => {
    const value = await tryreturn(async _ => {
      throw new Error();
    }).orelse(async _ => 1);
    assert(value).equals(1);
  });
  test.case("else throws", async assert => {
    try {
      await tryreturn(async _ => {
        throw new Error();
      }).orelse(async _ => {
        throw new Error("else");
      });
    } catch (error) {
      assert(error.message).equals("else");
    }
  });
};
