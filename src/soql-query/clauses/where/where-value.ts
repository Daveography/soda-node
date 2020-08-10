import { ColumnType } from '../column-types';

export class WhereValue<TValue extends ColumnType> {
  public readonly Value: TValue;

  constructor(value: TValue) {
    if (value === null) {
      throw new Error("Value must be provided");
    }

    this.Value = value;
  }

  public toString(): string {
    return `'${this.Value}'`;
  }
}
