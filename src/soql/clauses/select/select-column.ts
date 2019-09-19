import { Column } from "../column";

export class SelectColumn extends Column {
  public readonly As: string;

  constructor(private columnName: string, private as?: string) {
    super(columnName);

    if (as) {
      this.As = as;
    }
  }

  public toString(): string {
    if (this.As) {
      return `${super.toString()} AS ${this.As}`;
    }

    return super.toString();
  }
}
