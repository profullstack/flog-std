import {IncomingMessage} from "http";
import {Readable} from "stream";

export default class Request {
  #body;
  #headers = new Headers();
  #url;
  #method;

  constructor(input, {headers} = {}) {
    if (input instanceof IncomingMessage) {
      this.#body = Readable.toWeb(input);
    }
    if (headers !== undefined) {
      Object.entries(headers).forEach(header => {
        this.#headers.set(...header);
      });
    }
    if (input.method !== undefined) {
      this.#method = input.method;
    }
    if (input.url !== undefined) {
      this.#url = input.url;
    }
  }

  get headers() {
    return this.#headers;
  }

  get url() {
    return this.#url;
  }

  get body() {
    return this.#body;
  }

  get method() {
    return this.#method;
  }
}
