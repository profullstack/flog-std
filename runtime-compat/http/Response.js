export default class {
  constructor(body, {status, statusText, headers}) {
    this.body = body;
    this.status = status;
    this.headers = new Headers();
  }
}
