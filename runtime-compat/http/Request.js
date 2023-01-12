import {IncomingMessage} from "http";

export default class {
  #body;
  #headers = new Headers();
  #url;
  #method;

  constructor(input, {headers} = {}) {
    if (input instanceof IncomingMessage) {
      this.#fromIncomingMessage(input);
    }
    if (headers !== undefined) {
      Object.entries(headers).forEach(header => {
        this.#headers.set(...header);
      });
    }
    ["url", "method"].filter(property => input[property]).forEach(property => {
      this[`#${property}`] = input[property];
    });
  }

  #fromIncomingMessage(outgoingMessage) {
    this.#body = new ReadableStream({
      start(controller) {
        outgoingMessage.on("data", chunk => {
          controller.enqueue(chunk);
        });
        outgoingMessage.on("end", () => {
          controller.close();
        });
      },
    });
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
