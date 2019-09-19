export class SodaHost {

  constructor(private host: string) {
    if (!host) {
      throw new Error("Host must be provided");
    }
  }

  public toString(): string {
    return this.host;
  }
}
