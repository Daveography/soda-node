import { IWhereValue } from "./where-value";

export class WhereStringValue implements IWhereValue {
  public readonly Value: string;

  constructor(private value: string) {
    if (!value) {
      throw new Error("Value must be provided");
    }

    this.Value = value;
  }

  public toString(): string {
    return `'${this.Value}'`;
  }
}
