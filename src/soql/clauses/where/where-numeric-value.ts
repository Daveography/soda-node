import { IWhereValue } from "./where-value";

export class WhereNumericValue implements IWhereValue {
  public readonly Value: number;

  constructor(private value: number) {
    if (value === null) {
      throw new Error("Value must be provided");
    }

    this.Value = value;
  }

  public toString(): string {
    return `'${this.Value}'`;
  }
}
