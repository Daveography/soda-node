import { Geometry } from 'geojson';
import { Observable } from 'rxjs';
import { Location } from '../datatypes/location';
import { ColumnType } from '../soql-query/clauses/column-types';
import { DataSetColumn } from './dataset-column';
import { IGeometryFilter } from './filters/igeometryfilter';
import { ILocationFilter } from './filters/ilocationfilter';
import { IWhereFilter } from './filters/iwherefilter';

export interface IQueryable<TEntity> {
  select<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IQueryable<TEntity>;
  where<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IWhereFilter<TEntity, TValue>;
  location(column: (type: TEntity) => Location): ILocationFilter<TEntity>;
  geometry(column: (type: TEntity) => Geometry): IGeometryFilter<TEntity>;
  limit(records: number): IQueryable<TEntity>;
  offset(records: number): IQueryable<TEntity>;
  observable(): Observable<TEntity[]>;
  toString(): string;
}
