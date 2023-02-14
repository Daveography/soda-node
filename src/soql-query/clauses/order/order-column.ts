import { Column } from "../column";

export class OrderColumn extends Column {
  public readonly Descending: boolean = false;

  constructor(columnName: string, descending?: boolean) {
    super(columnName);

    if (descending) {
      this.Descending = descending;
    }
  }

  public toString(): string {
    if (this.Descending) {
      return `${super.toString()} DESC`;
    }

    return super.toString();
  }
}
