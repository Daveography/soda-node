import { IClause } from "./clause";

export class LimitClause implements IClause {
  public readonly MaxRows: number;

  constructor(private maxRows: number) {
    if (maxRows <= 0) {
      throw new Error("Max Rows must be 1 or greater");
    }

    if (!Number.isInteger(maxRows)) {
      throw new Error("Max Rows must be a whole number");
    }

    this.MaxRows = maxRows;
  }

  public toString(): string {
    return `$limit=${this.MaxRows}`;
  }
}
