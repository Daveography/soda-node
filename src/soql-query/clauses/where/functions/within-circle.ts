import { Point } from 'geojson';
import { Location } from '../../../../datatypes/location';
import { Meters } from '../../../../datatypes/metres';
import { WellKnownType } from '../../../../datatypes/well-known-type';
import { LocationUtils } from '../../../../utilities/location-utils';
import { Column } from '../../column';
import { IWhereComponent } from '../where-component';

export class WithinCircle implements IWhereComponent {
  public readonly Column: Column;
  public readonly Location: Location | Point;
  public readonly Radius: Meters;

  constructor(column: Column, location: Location | Point, radius: Meters) {
    if (!column) {
      throw new Error("Column must be provided");
    }
    if (!location) {
      throw new Error("Location point must be provided");
    }
    if (!radius) {
      throw new Error("Radius must be provided");
    }
    
    this.Column = column;
    this.Location = location;
    this.Radius = radius;
  }

  public toString(): string {
    if (LocationUtils.isLocation(this.Location)) {
      return `within_circle(${this.Column}, ${this.Location}, ${this.Radius})`;
    }
    else {
      const wkt = new WellKnownType(this.Location);
      return `within_circle(${this.Column}, '${wkt}', ${this.Radius})`;
    }
  }
}
