import {Path} from "../../fs/exports.js";

const root = await Path.root();

const env = root.join(`.env${process.env.JS_ENV ?? ""}`);
const local = new Path(`${env.path}.local`);

const read = async path => Object.fromEntries((await path.text())
  .split("\n")
  .filter(line => /^\w*=.*$/u.test(line))
  .map(line => line.split("="))
);

let vars = undefined;

try {
  vars = await read(await local.exists ? local : env);
} catch (error) {
  console.log("error loading env file");
}

export default vars;
