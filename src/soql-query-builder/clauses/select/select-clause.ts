import { IClause } from "../clause";
import { Column } from "../column";

export class SelectClause implements IClause {
  public readonly Columns: Column[];

  constructor(...columns: Column[]) {
    this.Columns = columns;
  }

  public add(...columns: Column[]): void {
    this.Columns.push(...columns);
  }

  public toString(): string {
    if (this.Columns && this.Columns.length > 0) {
      return `$select=${this.Columns.join(",")}`;
    }

    return "";
  }
}
