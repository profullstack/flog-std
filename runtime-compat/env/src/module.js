import {parse} from "dotenv";
import {Path} from "../../fs/exports.js";
import {tryreturn} from "../../async/exports.js";

const root = await Path.root();

const {JS_ENV} = process.env;

const env = root.join(`.env${JS_ENV ? `.${JS_ENV}` : ""}`);
const local = new Path(`${env.path}.local`);

const read = async () => parse(await (await local.exists ? local : env).text());

export default await tryreturn(_ => read()).orelse(_ => ({}));
