import { Location } from '../../../../datatypes/location';
import { Column } from '../../column';
import { IWhereComponent } from '../where-component';
import { Geometry } from 'geojson';
import { WellKnownType } from '../../../../datatypes/well-known-type';

export class Intersects implements IWhereComponent {
  public readonly Column: Column;
  public readonly Geometry: Geometry;

  constructor(column: Column, geometry: Geometry) {
    this.Column = column;
    this.Geometry = geometry;
  }

  public toString(): string {
    const wkt = new WellKnownType(this.Geometry);
    return `intersects(${this.Column}, '${wkt}')`;
  }
}
