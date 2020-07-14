import { Geometry, MultiPolygon, Point } from 'geojson';
import { WithinPolygon } from 'src/soql-query-builder/clauses/where/functions/within-polygon';
import { Meters } from '../datatypes/metres';
import { Column } from '../soql-query-builder/clauses/column';
import { Intersects } from '../soql-query-builder/clauses/where/functions/intersects';
import { WithinBox } from '../soql-query-builder/clauses/where/functions/within-box';
import { WithinCircle } from '../soql-query-builder/clauses/where/functions/within-circle';
import { IGeometryFilter } from './igeometryfilter';
import { IQueryable } from './iqueryable';
import { SoqlQuery } from './soql-query';

export class SoqlGeometryFilter<TEntity> implements IGeometryFilter<TEntity> {

  public constructor(protected readonly query: SoqlQuery<TEntity>, protected readonly column: Column) {
    if (!query) {
      throw new Error("queryBuilder must be provided");
    }
    if (!column) {
      throw new Error("column must be provided");
    }
  }

  public intersects(geometry: Geometry): IQueryable<TEntity> {
    if (!geometry) {
      throw new Error("Geometry must be provided");
    }

    const filter = new Intersects(this.column, geometry);
    return this.query.addFilter(filter);
  }

  public withinCircle(point: Point, radius: Meters): IQueryable<TEntity> {
    if (!location) {
      throw new Error("Point must be provided");
    }
    if (!radius) {
      throw new Error("Radius must be provided");
    }

    const filter = new WithinCircle(this.column, point, radius);
    return this.query.addFilter(filter);
  }

  public withinBox(start: Point, end: Point): IQueryable<TEntity> {
    if (!start) {
      throw new Error("Start point must be provided");
    }
    if (!end) {
      throw new Error("End point must be provided");
    }

    const filter = new WithinBox(this.column, start, end);
    return this.query.addFilter(filter);
  }

  public withinPolygon(multiPolygon: MultiPolygon): IQueryable<TEntity> {
    if (!multiPolygon) {
      throw new Error("MultiPolygon must be provided");
    }

    const filter = new WithinPolygon(this.column, multiPolygon);
    return this.query.addFilter(filter);
  }
}
