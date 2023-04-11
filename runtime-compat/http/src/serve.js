import {Writable} from "stream";
import Request from "./Request.js";

const hasSSL = ({ssl}) => ssl?.key !== undefined && ssl.cert !== undefined;
const plain = () => ({type: "http", options: {}});
const secure = async conf => {
  const key = await conf.ssl.key.file.read();
  const cert = await conf.ssl.cert.file.read();
  return {type: "https", options: {key, cert}};
};

const resolve = conf => hasSSL(conf) ? secure(conf) : plain(conf);

export default async (handler, conf) => {
  const {type, options} = await resolve(conf);

  return import(type).then(({createServer}) =>
    createServer(options, async (req, res) => {
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
};
