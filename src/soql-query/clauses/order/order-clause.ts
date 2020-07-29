import { IClause } from "../clause";
import { Column } from '../column';

export class OrderClause implements IClause {
  public readonly Columns: Column[];

  constructor(...columns: Column[]) {
    if (!columns || columns.length === 0) {
      throw new Error("At least one column must be provided");
    }
    
    this.Columns = columns;
    Object.freeze(this.Columns);
  }

  public toString(): string {
    if (this.Columns && this.Columns.length > 0) {
      return `$order=${this.Columns.join(",")}`;
    }

    return "";
  }
}
