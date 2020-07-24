import { ColumnType } from 'src/soql-query-builder/clauses/column-types';
import { IQueryable } from './iqueryable';
import { IWhereFilter } from './iwherefilter';

export interface IFilteredQueryable<TEntity> extends IQueryable<TEntity> {
  and<TValue extends ColumnType>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue>;
  or<TValue extends ColumnType>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue>;
}
