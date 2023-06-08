import {is} from "../dyndef/exports.js";
const $backup = Symbol("backup");

export default trial => ({
  [$backup]: undefined,
  then(onFulfilled, onRejected) {
    is(trial).function();
    is(this[$backup]).defined("`tryreturn` executed without a backup");

    try {
      Promise.resolve(trial())
        .then(onFulfilled, error => this[$backup](error))
        .then(onFulfilled, onRejected);
    } catch (error) {
      onFulfilled(this[$backup](error));
    }
  },
  orelse(backup) {
    is(backup).function();

    this[$backup] = backup;
    return this;
  },
});
