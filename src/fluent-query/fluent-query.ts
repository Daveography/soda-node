import { Geometry } from 'geojson';
import { Observable } from 'rxjs';
import { ISodaResource } from '../client/isoda-resource';
import { Location } from '../datatypes/location';
import { Column, OrderColumn, WhereOperator, Operator } from "../soql-query/clauses";
import { ColumnType } from '../soql-query/clauses/column-types';
import { WhereFilterType } from '../soql-query/clauses/where/where-filters-type';
import { SoqlQueryBuilder } from '../soql-query/soql-query-builder';
import { DataSetColumn } from './dataset-column';
import { BasicWhereFilter } from './filters/basic-where-filter';
import { GeometryFilter } from './filters/geometry-filter';
import { IGeometryFilter } from './filters/igeometry-filter';
import { ILocationFilter } from './filters/ilocation-filter';
import { IWhereFilter } from './filters/where-filter';
import { LocationFilter } from './filters/location-filter';
import { IFilteredQueryable } from './ifiltered-queryable';
import { IInternalQuery } from './iinternal-query';
import { IQueryable } from './iqueryable';

export class FluentQuery<TEntity> implements IQueryable<TEntity>, IInternalQuery<TEntity> {

  constructor(readonly sodaResource: ISodaResource<TEntity>, private readonly queryBuilder: SoqlQueryBuilder = new SoqlQueryBuilder()) {
    if (!sodaResource) {
      throw new Error("resource must be provided");
    }
  }

  //region IQueryable
  public select<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IQueryable<TEntity> {
    const newBuilder = this.cloneBuilder().select(Column.of(column));
    return this.updateQuery(newBuilder);
  }

  public where<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IWhereFilter<TEntity, TValue> {
    return new BasicWhereFilter(this, Column.of(column));
  }

  // TODO: If TypeScript ever allows type guards on generics, create an overload where() instead
  public location(column: (type: TEntity) => Location): ILocationFilter<TEntity> {
    return new LocationFilter(this, Column.of(column));
  }

  // TODO: If TypeScript ever allows type guards on generics, create an overload where() instead
  public geometry(column: (type: TEntity) => Geometry): IGeometryFilter<TEntity> {
    return new GeometryFilter(this, Column.of(column));
  }

  public limit(records: number): IQueryable<TEntity> {
    const newBuilder = this.cloneBuilder().limit(records);
    return this.updateQuery(newBuilder);
  }

  public offset(records: number): IQueryable<TEntity> {
    const newBuilder = this.cloneBuilder().offset(records);
    return this.updateQuery(newBuilder);
  }

  public orderBy<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>, descending?: boolean): IQueryable<TEntity> {
    const newBuilder = this.cloneBuilder().orderBy(new OrderColumn(Column.of(column).Name, descending));
    return this.updateQuery(newBuilder);
  }

  public observable(): Observable<TEntity[]> {
    return this.sodaResource.Context.Client.getResource(this.sodaResource, this);
  }

  public toString(): string {
    return this.queryBuilder.getQuery().toString();
  }
  //endregion

  //region IFilteredQueryable
  public and<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IWhereFilter<TEntity, TValue> {
    return new BasicWhereFilter(this, Column.of(column), new WhereOperator(Operator.And));
  }

  public or<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IWhereFilter<TEntity, TValue> {
    return new BasicWhereFilter(this, Column.of(column), new WhereOperator(Operator.Or));
  }
  //endregion

  //region IInternalQuery

  public addFilter(...filters: WhereFilterType[]): IFilteredQueryable<TEntity> {
    const newBuilder = this.cloneBuilder().filter(...filters);
    return new FluentQuery<TEntity>(this.sodaResource, newBuilder);
  }
  //endregion

  private updateQuery(newBuilder: SoqlQueryBuilder): IQueryable<TEntity> {
    return new FluentQuery<TEntity>(this.sodaResource, newBuilder);
  }

  private cloneBuilder() {
    return this.queryBuilder.clone();
  }
}
