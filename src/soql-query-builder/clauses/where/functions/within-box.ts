import { Location } from '../../../../datatypes/location';
import { Column } from '../../column';
import { IWhereComponent } from '../where-component';

export class WithinBox implements IWhereComponent {
  public readonly Column: Column;
  public readonly Start: Location;
  public readonly End: Location;

  constructor(column: Column, start: Location, end: Location) {
    this.Column = column;
    this.Start = start;
    this.End = end;
  }

  public toString(): string {
    return `within_box(${this.Column}, ${this.Start}, ${this.End})`;
  }
}