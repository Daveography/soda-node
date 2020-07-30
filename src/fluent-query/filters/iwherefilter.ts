import { ColumnType } from '../../soql-query/clauses/column-types';
import { BetweenFunctionType } from '../../soql-query/clauses/where/functions/between-function-types';
import { InFunctionType } from '../../soql-query/clauses/where/functions/in-function-types';
import { IFilteredQueryable } from '../ifilteredqueryable';

export interface IWhereFilter<TEntity, TValue extends ColumnType> {
  equals(value: TValue): IFilteredQueryable<TEntity>;
  greaterThan(value: TValue): IFilteredQueryable<TEntity>;
  lessThan(value: TValue): IFilteredQueryable<TEntity>;
  isNull(): IFilteredQueryable<TEntity>;
  isNotNull(): IFilteredQueryable<TEntity>;
  between<TValue extends BetweenFunctionType>(from: TValue, to: TValue): IFilteredQueryable<TEntity>;
  notBetween<TValue extends BetweenFunctionType>(from: TValue, to: TValue): IFilteredQueryable<TEntity>;
  in<TValue extends InFunctionType>(...values: TValue[]): IFilteredQueryable<TEntity>;
  notIn<TValue extends InFunctionType>(...values: TValue[]): IFilteredQueryable<TEntity>;
  like(value: string): IFilteredQueryable<TEntity>;
  notLike(value: string): IFilteredQueryable<TEntity>;
  startsWith(value: string): IFilteredQueryable<TEntity>;
  not(): IWhereFilter<TEntity, TValue>;
}
