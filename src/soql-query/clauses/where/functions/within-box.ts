import { Point } from 'geojson';
import { Location } from '../../../../datatypes/location';
import { WellKnownType } from '../../../../datatypes/well-known-type';
import { LocationUtils } from '../../../../utilities/location-utils';
import { Column } from '../../column';
import { IWhereComponent } from '../where-component';

export class WithinBox<TCoordinate extends Location | Point> implements IWhereComponent {
  public readonly Column: Column;
  public readonly Start: TCoordinate;
  public readonly End: TCoordinate;

  constructor(column: Column, start: TCoordinate, end: TCoordinate) {
    if (!column) {
      throw new Error("Column must be provided");
    }
    if (!start) {
      throw new Error("Start point must be provided");
    }
    if (!end) {
      throw new Error("End point must be provided");
    }
    
    this.Column = column;
    this.Start = start;
    this.End = end;
  }

  public toString(): string {
    if (LocationUtils.isLocation(this.Start)) {
      return `within_box(${this.Column}, ${this.Start}, ${this.End})`;
    }
    else {
      const wktStart = new WellKnownType(this.Start as Point);
      const wktEnd = new WellKnownType(this.End as Point);
      return `within_box(${this.Column}, '${wktStart}', '${wktEnd}')`;
    }
  }
}
