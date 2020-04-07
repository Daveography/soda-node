import { Column } from "../column";
import { Comparitor } from "./comparitor";
import { IWhereComponent } from "./where-component";
import { IWhereValue } from "./where-value";

export class WhereFilter implements IWhereComponent {
  public readonly Column: Column;
  public readonly Comparitor: Comparitor;
  public readonly Value: IWhereValue;

  constructor(private column: Column, private comparitor: Comparitor, private value?: IWhereValue) {
    if (value && Comparitor.isCheckingNull(comparitor)) {
      throw new Error("Value must not be provided when using IsNull or IsNotNull comparitor");
    }

    this.Column = column;
    this.Comparitor = comparitor;
    this.Value = value;
  }

  public toString(): string {
    let clause = `${this.Column.toString()} ${this.Comparitor.toString()}`;

    if (!Comparitor.isCheckingNull(this.Comparitor)) {
      clause += ` ${this.Value.toString()}`;
    }

    return clause;
  }
}
