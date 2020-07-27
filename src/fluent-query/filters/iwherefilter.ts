import { IFilteredQueryable } from '../ifilteredqueryable';

export interface IWhereFilter<TEntity, TValue> {
  equals(value: TValue): IFilteredQueryable<TEntity>;
  greaterThan(value: TValue): IFilteredQueryable<TEntity>;
  lessThan(value: TValue): IFilteredQueryable<TEntity>;
  isNull(): IFilteredQueryable<TEntity>;
  isNotNull(): IFilteredQueryable<TEntity>;
}
