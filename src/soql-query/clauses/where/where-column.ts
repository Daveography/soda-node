import { Column } from "../column";

export class WhereColumn extends Column {
  public readonly As: string;

  constructor(columnName: string) {
    super(columnName);
  }

  public toString(): string {

    return super.toString();
  }
}
