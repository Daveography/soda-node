export class WhereValue<TValue> {
  public readonly Value: TValue;

  constructor(value: TValue) {
    if (value === null) {
      throw new Error("Value must be provided");
    }

    this.Value = value;
  }

  public toString(): string {
    return `'${this.Value}'`;
  }
}
