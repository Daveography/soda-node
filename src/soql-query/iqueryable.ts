import { Observable } from 'rxjs';
import { IWhereFilter } from './iwherefilter';

export interface IQueryable<TEntity> {
  select<TValue>(column: (type: TEntity) => TValue): IQueryable<TEntity>;
  where<TValue>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue>;
  limit(records: number): IQueryable<TEntity>;
  offset(records: number): IQueryable<TEntity>;
  toArray(): Observable<TEntity[]>;
  toString(): string;
}