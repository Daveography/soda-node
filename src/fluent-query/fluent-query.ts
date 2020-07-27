import { Geometry } from 'geojson';
import { Observable } from 'rxjs';
import { ISodaResource } from '../client/isodaresource';
import { Location } from '../datatypes/location';
import { Column, IClause, IWhereComponent, LimitClause, OffsetClause, SelectClause } from "../soql-query/clauses";
import { ColumnType } from '../soql-query/clauses/column-types';
import { SoqlQueryBuilder } from '../soql-query/soql-query-builder';
import { DataSetColumn } from './dataset-column';
import { AndWhereFilter } from './filters/and-where-filter';
import { BasicWhereFilter } from './filters/basic-where-filter';
import { GeometryFilter } from './filters/geometry-filter';
import { IGeometryFilter } from './filters/igeometryfilter';
import { ILocationFilter } from './filters/ilocationfilter';
import { IWhereFilter } from './filters/iwherefilter';
import { LocationFilter } from './filters/location-filter';
import { OrWhereFilter } from './filters/or-where-filter';
import { IFilteredQueryable } from './ifilteredqueryable';
import { IInternalQuery } from './iinternalquery';
import { IQueryable } from './iqueryable';

export class FluentQuery<TEntity> implements IQueryable<TEntity>, IInternalQuery<TEntity> {

  constructor(readonly sodaResource: ISodaResource<TEntity>, private readonly queryBuilder?: SoqlQueryBuilder) {
    if (!sodaResource) {
      throw new Error("resource must be provided");
    }

    if (!queryBuilder) {
      this.queryBuilder = new SoqlQueryBuilder();
    }
  }

  //region IQueryable 
  // TODO: Add overload to accept multiple columns as parameters
  public select<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IQueryable<TEntity> {
    return this.addClause(new SelectClause(Column.of(column)));
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
    return new AndWhereFilter(this, Column.of(column));
  }

  public or<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IWhereFilter<TEntity, TValue> {
    return new OrWhereFilter(this, Column.of(column));
  }
  //endregion

  //region IInternalQuery
  public addClause(newClause: IClause): IQueryable<TEntity> {
    const newBuilder = this.queryBuilder.addClause(newClause);
    return new FluentQuery<TEntity>(this.sodaResource, newBuilder);
  }

  public addFilter(...filter: IWhereComponent[]): IFilteredQueryable<TEntity> {
    const newBuilder = this.queryBuilder.addFilter(...filter);
    return new FluentQuery<TEntity>(this.sodaResource, newBuilder);
  }
  //endregion
}
