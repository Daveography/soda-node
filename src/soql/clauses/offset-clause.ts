import { IClause } from "./clause";

export class OffsetClause implements IClause {
  public readonly Rows: number;

  constructor(private rows: number) {
    if (rows < 0) {
      throw new Error("Rows must be 0 or greater");
    }

    if (!Number.isInteger(rows)) {
      throw new Error("Rows must be a whole number");
    }

    this.Rows = rows;
  }

  public toString(): string {
    if (this.Rows > 0) {
      return `$offset=${this.Rows}`;
    }

    return "";
  }
}
