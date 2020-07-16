import { Geometry } from 'geojson';
import { Observable } from 'rxjs';
import { ColumnType } from 'src/soql-query-builder/clauses/column-types';
import { ISodaResource } from '../client/isodaresource';
import { Location } from '../datatypes/location';
import { Column, IClause, IWhereComponent, LimitClause, OffsetClause, SelectClause, WhereFilter } from "../soql-query-builder/clauses";
import { ImmutableSoqlQueryBuilder } from '../soql-query-builder/immutable-soql-query-builder';
import { IGeometryFilter } from './igeometryfilter';
import { ILocationFilter } from './ilocationfilter';
import { IQueryable } from './iqueryable';
import { IWhereFilter } from './iwherefilter';
import { SoqlGeometryFilter } from './soql-geometry-filter';
import { SoqlLocationFilter } from './soql-location-filter';
import { SoqlWhereFilter } from './soql-where-filter';

export class SoqlQuery<TEntity> implements IQueryable<TEntity> {

  constructor(readonly sodaResource: ISodaResource<TEntity>, private readonly queryBuilder?: ImmutableSoqlQueryBuilder) {
    if (!sodaResource) {
      throw new Error("resource must be provided");
    }

    if (!queryBuilder) {
      this.queryBuilder = new ImmutableSoqlQueryBuilder();
    }
  }

  // TODO: Add overload to accept multiple columns as parameters
  public select<TValue extends ColumnType>(column: (type: TEntity) => TValue): IQueryable<TEntity> {
    return this.addClause(new SelectClause(Column.of(column)));
  }

  public where<TValue extends ColumnType>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue> {
    return new SoqlWhereFilter(this, Column.of(column));
  }

  // TODO: If TypeScript ever allows type guards on generics, create an overload where() instead
  public whereLocation(column: (type: TEntity) => Location): ILocationFilter<TEntity> {
    return new SoqlLocationFilter(this, Column.of(column));
  }

  // TODO: If TypeScript ever allows type guards on generics, create an overload where() instead
  public whereGeometry(column: (type: TEntity) => Geometry): IGeometryFilter<TEntity> {
    return new SoqlGeometryFilter(this, Column.of(column));
  }

  public limit(records: number): IQueryable<TEntity> {
    return this.addClause(new LimitClause(records));
  }

  public offset(records: number): IQueryable<TEntity> {
    return this.addClause(new OffsetClause(records));
  }

  public observable(): Observable<TEntity[]> {
    return this.sodaResource.Context.Client.getResource(this.sodaResource, this);
  }

  public toString(): string {
    return this.queryBuilder.toString();
  }

  public addClause(newClause: IClause): SoqlQuery<TEntity> {
    const newBuilder = this.queryBuilder.addClause(newClause);
    return new SoqlQuery<TEntity>(this.sodaResource, newBuilder);
  }

  public addFilter<TValue>(filter: WhereFilter<TValue> | IWhereComponent): SoqlQuery<TEntity> {
    const newBuilder = this.queryBuilder.addFilter(filter);
    return new SoqlQuery<TEntity>(this.sodaResource, newBuilder);
  }
}
