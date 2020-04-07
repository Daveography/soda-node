import { IQueryable } from './iqueryable';

export interface IWhereFilter<TEntity, TValue> {
  equals(value: TValue): IQueryable<TEntity>;
  greaterThan(value: TValue): IQueryable<TEntity>;
  lessThan(value: TValue): IQueryable<TEntity>;
  isNull(): IQueryable<TEntity>;
  isNotNull(): IQueryable<TEntity>;
}