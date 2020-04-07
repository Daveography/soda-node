import { Operator } from "./operator";
import { IWhereComponent } from "./where-component";

export class WhereOperator implements IWhereComponent {
  public readonly Operator: Operator;

  constructor(private operator: Operator) {
    if (!operator) {
      throw new Error("Operator type must be provided");
    }

    this.Operator = operator;
  }

  public toString(): string {
    return this.Operator.toString();
  }
}
