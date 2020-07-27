import { Column } from "../column";
import { Comparitor } from "./comparitor";
import { IWhereComponent } from "./where-component";
import { WhereValue } from "./where-value";

export class WhereFilter<T> implements IWhereComponent {
  public readonly Column: Column;
  public readonly Comparitor: Comparitor;
  public readonly Value: WhereValue<T>;

  constructor(private column: Column, private comparitor: Comparitor, private value?: WhereValue<T>) {
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
