import {IncomingMessage} from "http";
import {Readable} from "stream";
import {is} from "../dyndef/exports.js";

export default class Request {
  #body;
  #headers = new Headers();
  #url;
  #method;

  constructor(input, {headers} = {}) {
    is(input).object();
    const {method, url} = input;

    is(method).string();
    this.#method = method;

    is(url).string();
    this.#url = url;

    is(headers).object();
    Object.entries(headers).forEach(header => this.#headers.set(...header));

    this.#setBody(input);
  }

  #setBody(input) {
    if (input instanceof IncomingMessage) {
      this.#body = Readable.toWeb(input);
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
