import {is} from "../dyndef/exports.js";
const $backup = Symbol("backup");
const $sync = Symbol("sync");

const type = ({constructor: {name}}) => name;

export default trial => ({
  [$backup]: undefined,
  [$sync]() {
    try {
      return trial();
    } catch (error) {
      return this[$backup](error);
    }
  },
  then(onFulfilled, onRejected) {
    is(trial).function();
    is(this[$backup]).defined("`tryreturn` executed without a backup");

    try {
      trial()
        .then(onFulfilled, error => this[$backup](error))
        .then(onFulfilled, onRejected);
    } catch (error) {
      onFulfilled(this[$backup](error));
    }
  },
  orelse(backup) {
    is(trial).function();
    is(backup).function();
    this[$backup] = backup;

    return type(trial) === "Function"
      // execute directly for sync functions
      ? this[$sync]()
      // delegate to `then`
      : this;
  },
});
