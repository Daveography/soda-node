import { Geometry, MultiPolygon, Point } from 'geojson';
import { IWhereComponent } from 'src/soql-query';
import { Meters } from '../../datatypes/metres';
import { Column } from '../../soql-query/clauses/column';
import { Intersects } from '../../soql-query/clauses/where/functions/intersects';
import { WithinBox } from '../../soql-query/clauses/where/functions/within-box';
import { WithinCircle } from '../../soql-query/clauses/where/functions/within-circle';
import { WithinPolygon } from '../../soql-query/clauses/where/functions/within-polygon';
import { WhereOperator } from '../../soql-query/clauses/where/where-operator';
import { IFilteredQueryable } from '../ifilteredqueryable';
import { IInternalQuery } from '../iinternalquery';
import { IGeometryFilter } from './igeometryfilter';

export class GeometryFilter<TEntity> implements IGeometryFilter<TEntity> {
  private prependOperators: WhereOperator[];

  public constructor(
    protected readonly query: IInternalQuery<TEntity>,
    protected readonly column: Column,
    ...prependOperators: WhereOperator[]
  ) {
    if (!query) {
      throw new Error("query must be provided");
    }
    if (!column) {
      throw new Error("column must be provided");
    }

    this.prependOperators = prependOperators;
  }

  public intersects(geometry: Geometry): IFilteredQueryable<TEntity> {
    if (!geometry) {
      throw new Error("Geometry must be provided");
    }

    const filter = new Intersects(this.column, geometry);
    return this.addFilter(filter);
  }

  public withinCircle(point: Point, radius: Meters): IFilteredQueryable<TEntity> {
    if (!location) {
      throw new Error("Point must be provided");
    }
    if (!radius) {
      throw new Error("Radius must be provided");
    }

    const filter = new WithinCircle(this.column, point, radius);
    return this.addFilter(filter);
  }

  public withinBox(start: Point, end: Point): IFilteredQueryable<TEntity> {
    if (!start) {
      throw new Error("Start point must be provided");
    }
    if (!end) {
      throw new Error("End point must be provided");
    }

    const filter = new WithinBox(this.column, start, end);
    return this.addFilter(filter);
  }

  public withinPolygon(multiPolygon: MultiPolygon): IFilteredQueryable<TEntity> {
    if (!multiPolygon) {
      throw new Error("MultiPolygon must be provided");
    }

    const filter = new WithinPolygon(this.column, multiPolygon);
    return this.addFilter(filter);
  }

  private addFilter(filter: IWhereComponent): IFilteredQueryable<TEntity> {
    return this.query.addFilter(...this.prependOperators, filter);
  }
}
