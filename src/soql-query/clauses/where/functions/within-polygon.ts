import { MultiPolygon } from 'geojson';
import { WellKnownType } from '../../../../datatypes/well-known-type';
import { Column } from '../../column';
import { IWhereComponent } from '../where-component';

export class WithinPolygon implements IWhereComponent {
  public readonly Column: Column;
  public readonly MultiPolygon: MultiPolygon;

  constructor(column: Column, multiPolygon: MultiPolygon) {
    if (!column) {
      throw new Error("Column must be provided");
    }
    if (!multiPolygon) {
      throw new Error("MultiPolygon must be provided");
    }

    this.Column = column;
    this.MultiPolygon = multiPolygon;
  }

  public toString(): string {
    const wkt = new WellKnownType(this.MultiPolygon);
    return `within_polygon(${this.Column}, '${wkt}')`;
  }
}
