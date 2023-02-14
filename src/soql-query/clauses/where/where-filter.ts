import { Column } from "../column";
import { ColumnType } from '../column-types';
import { Comparitor } from "./comparitor";
import { IWhereComponent } from "./where-component";
import { WhereValue } from "./where-value";

export class WhereFilter<TValue extends ColumnType> implements IWhereComponent {
  public readonly Column: Column;
  public readonly Comparitor: Comparitor;
  public readonly Value?: WhereValue<TValue>;

  constructor(column: Column, comparitor: Comparitor, value?: WhereValue<TValue>) {
    if (value && Comparitor.isCheckingNull(comparitor)) {
      throw new Error("Value must not be provided when using IsNull or IsNotNull comparitor");
    }

    this.Column = column;
    this.Comparitor = comparitor;
    this.Value = value;
  }

  public toString(): string {
    let clause = `${this.Column} ${this.Comparitor}`;

    if (!Comparitor.isCheckingNull(this.Comparitor)) {
      clause += ` ${this.Value}`;
    }

    return clause;
  }
}
