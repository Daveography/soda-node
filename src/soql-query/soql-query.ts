import { Geometry } from 'geojson';
import { Observable } from 'rxjs';
import { ISodaResource } from '../client/isodaresource';
import { Location } from '../datatypes/location';
import { Column, IClause, IWhereComponent, LimitClause, OffsetClause, SelectClause } from "../soql-query-builder/clauses";
import { ColumnType } from '../soql-query-builder/clauses/column-types';
import { ImmutableSoqlQueryBuilder } from '../soql-query-builder/immutable-soql-query-builder';
import { DataSetColumn } from './dataset-column';
import { IFilteredQueryable } from './ifilteredqueryable';
import { IGeometryFilter } from './igeometryfilter';
import { IInternalQuery } from './iinternalquery';
import { ILocationFilter } from './ilocationfilter';
import { IQueryable } from './iqueryable';
import { IWhereFilter } from './iwherefilter';
import { SoqlAndWhereFilter } from './soql-and-where-filter';
import { SoqlGeometryFilter } from './soql-geometry-filter';
import { SoqlLocationFilter } from './soql-location-filter';
import { SoqlOrWhereFilter } from './soql-or-where-filter';
import { SoqlWhereFilter } from './soql-where-filter';

export class SoqlQuery<TEntity> implements IQueryable<TEntity>, IInternalQuery<TEntity> {

  constructor(readonly sodaResource: ISodaResource<TEntity>, private readonly queryBuilder?: ImmutableSoqlQueryBuilder) {
    if (!sodaResource) {
      throw new Error("resource must be provided");
    }

    if (!queryBuilder) {
      this.queryBuilder = new ImmutableSoqlQueryBuilder();
    }
  }

  //region IQueryable 
  // TODO: Add overload to accept multiple columns as parameters
  public select<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IQueryable<TEntity> {
    return this.addClause(new SelectClause(Column.of(column)));
  }

  public where<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IWhereFilter<TEntity, TValue> {
    return new SoqlWhereFilter(this, Column.of(column));
  }

  // TODO: If TypeScript ever allows type guards on generics, create an overload where() instead
  public location(column: (type: TEntity) => Location): ILocationFilter<TEntity> {
    return new SoqlLocationFilter(this, Column.of(column));
  }

  // TODO: If TypeScript ever allows type guards on generics, create an overload where() instead
  public geometry(column: (type: TEntity) => Geometry): IGeometryFilter<TEntity> {
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
  //endregion

  //region IFilteredQueryable
  public and<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IWhereFilter<TEntity, TValue> {
    return new SoqlAndWhereFilter(this, Column.of(column));
  }

  public or<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IWhereFilter<TEntity, TValue> {
    return new SoqlOrWhereFilter(this, Column.of(column));
  }
  //endregion

  //region IInternalQuery
  public addClause(newClause: IClause): IQueryable<TEntity> {
    const newBuilder = this.queryBuilder.addClause(newClause);
    return new SoqlQuery<TEntity>(this.sodaResource, newBuilder);
  }

  public addFilter(...filter: IWhereComponent[]): IFilteredQueryable<TEntity> {
    const newBuilder = this.queryBuilder.addFilter(...filter);
    return new SoqlQuery<TEntity>(this.sodaResource, newBuilder);
  }
  //endregion
}
