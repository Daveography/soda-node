export class SodaHostUrl {

  constructor(private host: string) {
    const validationRegEx = new RegExp(/^(?![^\n]*\.$)(?:https?:\/\/)?(?:(?:[2][1-4]\d|25[1-5]|1\d{2}|[1-9]\d|[1-9])(?:\.(?:[2][1-4]\d|25[1-5]|1\d{2}|[1-9]\d|[0-9])){3}(?::\d{4})?|[a-z-]+(?:\.[a-z-]+){2,})\/?$/g);

    if (!this.host) {
      throw new Error("Host must be provided");
    }

    if (!validationRegEx.test(this.host)) {
      throw new Error("Host must be a valid url");
    }

    if (this.host.charAt(host.length - 1) !== "/") {
      this.host += "/";
    }
  }

  public toString(): string {
    return this.host;
  }
}
