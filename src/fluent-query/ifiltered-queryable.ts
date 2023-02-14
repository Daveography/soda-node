import { ColumnType } from '../soql-query/clauses/column-types';
import { DataSetColumn } from './dataset-column';
import { IWhereFilter } from './filters/where-filter';
import { IQueryable } from './iqueryable';

export interface IFilteredQueryable<TEntity> extends IQueryable<TEntity> {
  and<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IWhereFilter<TEntity, TValue>;
  or<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IWhereFilter<TEntity, TValue>;
}
