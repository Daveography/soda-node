import { Geometry } from 'geojson';
import { Observable } from 'rxjs';
import { Location } from '../datatypes/location';
import { ColumnType } from '../soql-query-builder/clauses/column-types';
import { IGeometryFilter } from './igeometryfilter';
import { ILocationFilter } from './ilocationfilter';
import { IWhereFilter } from './iwherefilter';

export interface IQueryable<TEntity> {
  select<TValue extends ColumnType>(column: (type: TEntity) => TValue): IQueryable<TEntity>;
  where<TValue extends ColumnType>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue>;
  whereLocation(column: (type: TEntity) => Location): ILocationFilter<TEntity>;
  whereGeometry(column: (type: TEntity) => Geometry): IGeometryFilter<TEntity>;
  limit(records: number): IQueryable<TEntity>;
  offset(records: number): IQueryable<TEntity>;
  observable(): Observable<TEntity[]>;
  toString(): string;
}