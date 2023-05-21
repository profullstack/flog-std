import {Path} from "../../fs/exports.js";

const root = await Path.root();

const {JS_ENV} = process.env;

const env = root.join(`.env${JS_ENV ? `.${JS_ENV}` : ""}`);
const local = new Path(`${env.path}.local`);

const read = async path => Object.fromEntries((await path.text())
  .split("\n")
  .filter(line => /^\w*=.*$/u.test(line))
  .map(line => line.split("="))
);
const select = async () => read(await local.exists ? local : env);

const tryback = async (trial, fallback) => {
  try {
    return await trial();
  } catch (error) {
    console.log(error);
    return fallback;
  }
};

export default await tryback(select, {});
