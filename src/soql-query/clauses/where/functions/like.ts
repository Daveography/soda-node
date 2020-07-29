import { IWhereComponent } from '../where-component';
import { Column } from '../../column';

export class Like implements IWhereComponent {
  public readonly Column: Column;
  public readonly Value: string;

  constructor(column: Column, value: string) {
    if (!column) {
      throw new Error("Column must be provided");
    }
    if (!value) {
      throw new Error("Value must be provided");
    }

    this.Column = column;
    this.Value = value;
  }

  public toString(): string {
    return `${this.Column} like '${this.Value}'`;
  }
}