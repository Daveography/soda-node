export class WhereValue<T> {
  public readonly Value: T;

  constructor(private value: T) {
    if (value === null) {
      throw new Error("Value must be provided");
    }

    this.Value = value;
  }

  public toString(): string {
    return `'${this.Value}'`;
  }
}
