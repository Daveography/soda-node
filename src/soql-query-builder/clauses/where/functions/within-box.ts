import { Point } from 'geojson';
import { Location } from '../../../../datatypes/location';
import { WellKnownType } from '../../../../datatypes/well-known-type';
import { LocationUtils } from '../../../../utilities/location-utils';
import { Column } from '../../column';
import { IWhereComponent } from '../where-component';

export class WithinBox<T extends Location | Point> implements IWhereComponent {
  public readonly Column: Column;
  public readonly Start: T;
  public readonly End: T;

  constructor(column: Column, start: T, end: T) {
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