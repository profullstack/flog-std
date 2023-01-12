import {createServer} from "https";
import Request from "./Request.js";

export default (handler, conf) => {
  const server = createServer(conf, async (_request, _response) => {
    // handler gets a WHATWG Request, and returns a WHATWG Response
    //
    // 1. wrap a node request in a WHATWG request
    const request = new Request(_request, {headers: _request.headers});

    const response = await handler(request);
    // 2. copy from a WHATWG response into a node response
    _response.writeHead(response.status);
    // should contain body
    _response.end();
  });
  server.listen(conf?.port ?? 9999, conf?.host ?? "localhost");
};
