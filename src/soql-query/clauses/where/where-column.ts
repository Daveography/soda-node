import { Column } from "../column";

export class WhereColumn extends Column {
  public readonly As: string;

  constructor(private columnName: string) {
    super(columnName);
  }

  public toString(): string {

    return super.toString();
  }
}
