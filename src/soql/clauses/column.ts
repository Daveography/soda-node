export class Column {
  public readonly Name: string;

  constructor(private name: string) {
    const validationRegEx = new RegExp(/^\w+$/);

    if (!name) {
      throw new Error("Column name must be provided");
    }

    if (!validationRegEx.test(name)) {
      throw new Error("Column name must contain only alphanumeric characters or underscores");
    }

    this.Name = name;
  }

  public toString(): string {
    return this.Name;
  }
}
