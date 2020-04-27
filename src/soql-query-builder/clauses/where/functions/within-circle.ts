import { Location } from '../../../../datatypes/location';
import { Meters } from '../../../../datatypes/metres';
import { Column } from '../../column';
import { IWhereComponent } from '../where-component';

export class WithinCircle implements IWhereComponent {
  public readonly Column: Column;
  public readonly Location: Location;
  public readonly Radius: Meters;

  constructor(column: Column, location: Location, radius: Meters) {
    this.Column = column;
    this.Location = location;
    this.Radius = radius;
  }

  public toString(): string {
    return `within_circle(${this.Column}, ${this.Location}, ${this.Radius})`;
  }
}