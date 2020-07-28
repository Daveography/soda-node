import { ColumnType } from './column-types';

export class Column {
  public static of<Type>(param: (type: Type) => ColumnType): Column {
    const varExtractor = new RegExp(/\w* => (.*)/);
    const matches = varExtractor.exec(param.toString());

    if (matches === null) {
        throw new Error(`Cannot find return type for param (value: ${param})`);
    }

    const returnValue = matches[1];
    const splits = returnValue.split(".");
    splits.shift();

    const columnName = splits.join().replace(",", "/");

    return new Column(columnName);
  }

  public readonly Name: string;

  constructor(name: string) {
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
