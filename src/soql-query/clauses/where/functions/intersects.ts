import { Geometry } from 'geojson';
import { WellKnownType } from '../../../../datatypes/well-known-type';
import { Column } from '../../column';
import { IWhereComponent } from '../where-component';
import { WhereValue } from '../where-value';

export class Intersects implements IWhereComponent {
  public readonly Column: Column;
  public readonly Geometry: WhereValue<Geometry>;

  constructor(column: Column, geometry: WhereValue<Geometry>) {
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
    const wkt = new WellKnownType(this.Geometry.Value);
    return `intersects(${this.Column}, '${wkt}')`;
  }
}
