import {is} from "../dyndef/exports.js";
const $backup = Symbol("backup");

export default trial => ({
  [$backup]: undefined,
  then(fulfill) {
    is(trial).function();
    is(this[$backup]).defined("`tryreturn` executed without a backup");

    try {
      Promise.resolve(trial())
        .then(fulfill, error => fulfill(this[$backup](error)));
    } catch (error) {
      fulfill(this[$backup](error));
    }
  },
  orelse(backup) {
    is(backup).function();

    this[$backup] = backup;
    return this;
  },
});
