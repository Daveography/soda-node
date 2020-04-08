export class SodaResourceId {

  constructor(private id: string) {
    const validationRegEx = new RegExp(/^[a-z0-9]{4}-[a-z0-9]{4}$/);

    if (!this.id) {
      throw new Error("Id must be provided");
    }

    if (!validationRegEx.test(this.id)) {
      throw new Error("Id must be in the format xxxx-xxxx");
    }
  }

  public toString(): string {
    return this.id;
  }
}
