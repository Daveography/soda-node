import { Observable } from 'rxjs';
import { Location } from '../datatypes/location';
import { ILocationFilter } from './ilocationfilter';
import { IWhereFilter } from './iwherefilter';

export interface IQueryable<TEntity> {
  select<TValue>(column: (type: TEntity) => TValue): IQueryable<TEntity>;
  where<TValue>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue>;
  whereLocation(column: (type: TEntity) => Location): ILocationFilter<TEntity>;
  limit(records: number): IQueryable<TEntity>;
  offset(records: number): IQueryable<TEntity>;
  observable(): Observable<TEntity[]>;
  toString(): string;
}