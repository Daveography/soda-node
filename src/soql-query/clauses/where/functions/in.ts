import { Column } from '../../column';
import { IWhereComponent } from '../where-component';
import { InFunctionType } from './in-function-types';
import { WhereValue } from '../where-value';

export class In<TValue extends InFunctionType> implements IWhereComponent {
  public readonly Column: Column;
  public readonly Values: WhereValue<TValue>[];

  constructor(column: Column, values: WhereValue<TValue>[]) {
    if (!column) {
      throw new Error("Column must be provided");
    }
    if (!values || values.length === 0) {
      throw new Error("Values must be provided");
    }

    this.Column = column;
    this.Values = values;
  }

  public toString(): string {
    const valuesList = this.Values.map(v => v.toString()).join(', ');
    return `${this.Column} in (${valuesList})`;
  }
}
