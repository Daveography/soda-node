import { Column } from "../column";

export class WhereColumn extends Column {
  constructor(columnName: string) {
    super(columnName);
  }

  public toString(): string {
    return super.toString();
  }
}
