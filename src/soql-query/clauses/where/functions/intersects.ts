import { Geometry } from 'geojson';
import { WellKnownType } from '../../../../datatypes/well-known-type';
import { Column } from '../../column';
import { IWhereComponent } from '../where-component';

export class Intersects implements IWhereComponent {
  public readonly Column: Column;
  public readonly Geometry: Geometry;

  constructor(column: Column, geometry: Geometry) {
    if (!column) {
      throw new Error("Column must be provided");
    }
    if (!geometry) {
      throw new Error("Geometry must be provided");
    }
    
    this.Column = column;
    this.Geometry = geometry;
  }

  public toString(): string {
    const wkt = new WellKnownType(this.Geometry);
    return `intersects(${this.Column}, '${wkt}')`;
  }
}
