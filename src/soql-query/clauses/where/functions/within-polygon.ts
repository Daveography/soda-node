import { MultiPolygon } from 'geojson';
import { WellKnownType } from '../../../../datatypes/well-known-type';
import { Column } from '../../column';
import { IWhereComponent } from '../where-component';
import { WhereValue } from '../where-value';

export class WithinPolygon implements IWhereComponent {
  public readonly Column: Column;
  public readonly MultiPolygon: WhereValue<MultiPolygon>;

  constructor(column: Column, multiPolygon: WhereValue<MultiPolygon>) {
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
    const wkt = new WellKnownType(this.MultiPolygon.Value);
    return `within_polygon(${this.Column}, '${wkt}')`;
  }
}
