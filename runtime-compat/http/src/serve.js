import {Writable} from "stream";
import Request from "./Request.js";

const secure = ({ssl}) => ssl?.key !== undefined && ssl.cert !== undefined;

const getOptions = async conf => secure(conf)
  ? {
    key: await conf.ssl.key.file.read(),
    cert: await conf.ssl.cert.file.read(),
  } : {};

export default async (handler, conf) =>
  import(secure(conf) ? "https" : "http").then(async ({createServer}) =>
    createServer(await getOptions(conf), async (req, res) => {
      // handler gets a WHATWG Request, and returns a WHATWG Response
      //
      // 1. wrap a node request in a WHATWG request
      const request = new Request(req, {headers: req.headers});

      const response = await handler(request);

      [...response.headers.entries()].forEach(([name, value]) => {
        res.setHeader(name, value);
      });

      res.writeHead(response.status);

      // 2. copy from a WHATWG response into a node response
      await response.body.pipeTo(Writable.toWeb(res));
    }).listen(conf.port, conf.host));
