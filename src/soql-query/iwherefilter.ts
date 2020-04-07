import { IQueryable } from './iqueryable';

export interface IWhereFilter<TEntity> {
  equals(value: string): IQueryable<TEntity>;
  greaterThan(value: string): IQueryable<TEntity>;
  lessThan(value: string): IQueryable<TEntity>;
  isNull(): IQueryable<TEntity>;
  isNotNull(): IQueryable<TEntity>;
}