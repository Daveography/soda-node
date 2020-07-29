import { Column } from '../../column';
import { IWhereComponent } from '../where-component';
import { BetweenFunctionType } from './between-function-types';

export class Between<TValue extends BetweenFunctionType> implements IWhereComponent {
  public readonly Column: Column;
  public readonly From: TValue;
  public readonly To: TValue;

  constructor(column: Column, from: TValue, to: TValue) {
    if (!column) {
      throw new Error("Column must be provided");
    }
    if (!from) {
      throw new Error("From value must be provided");
    }
    if (!to) {
      throw new Error("To value must be provided");
    }
    
    this.Column = column;
    this.From = from;
    this.To = to;
  }

  public toString(): string {
    return `${this.Column} between '${this.From}' and '${this.To}'`;
  }
}
