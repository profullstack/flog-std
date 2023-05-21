import {parse} from "dotenv";
import {Path} from "../../fs/exports.js";

const root = await Path.root();

const {JS_ENV} = process.env;

const env = root.join(`.env${JS_ENV ? `.${JS_ENV}` : ""}`);
const local = new Path(`${env.path}.local`);

const read = async () => parse(await (await local.exists ? local : env).text());

const tryback = async (trial, fallback) => {
  try {
    return await trial();
  } catch (error) {
    console.log(error);
    return fallback;
  }
};

export default await tryback(read, {});
