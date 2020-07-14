import { MultiPolygon } from 'geojson';
import { WellKnownType } from '../../../../datatypes/well-known-type';
import { Column } from '../../column';
import { IWhereComponent } from '../where-component';

export class WithinPolygon implements IWhereComponent {
  public readonly Column: Column;
  public readonly MultiPolygon: MultiPolygon;

  constructor(column: Column, multiPolygon: MultiPolygon) {
    this.Column = column;
    this.MultiPolygon = multiPolygon;
  }

  public toString(): string {
    const wkt = new WellKnownType(this.MultiPolygon);
    return `within_polygon(${this.Column}, '${wkt}')`;
  }
}
