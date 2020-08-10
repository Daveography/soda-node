import { IWhereComponent } from '../where-component';
import { Column } from '../../column';
import { WhereValue } from '../where-value';

export class Like implements IWhereComponent {
  public readonly Column: Column;
  public readonly Value: WhereValue<string>;

  constructor(column: Column, value: WhereValue<string>) {
    if (!column) {
      throw new Error("Column must be provided");
    }
    if (!value || !value.Value) {
      throw new Error("Value must be provided and cannot be empty");
    }

    this.Column = column;
    this.Value = value;
  }

  public toString(): string {
    return `${this.Column} like ${this.Value}`;
  }
}
