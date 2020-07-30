import { Column } from '../../column';
import { IWhereComponent } from '../where-component';
import { BetweenFunctionType } from './between-function-types';
import { WhereValue } from '../where-value';

export class Between<TValue extends BetweenFunctionType> implements IWhereComponent {
  public readonly Column: Column;
  public readonly From: WhereValue<TValue>;
  public readonly To: WhereValue<TValue>;

  constructor(column: Column, from: WhereValue<TValue>, to: WhereValue<TValue>) {
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
    return `${this.Column} between ${this.From} and ${this.To}`;
  }
}
