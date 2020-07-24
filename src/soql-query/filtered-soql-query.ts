import { ColumnType } from 'src/soql-query-builder/clauses/column-types';
import { Column } from '../soql-query-builder';
import { IFilteredQueryable } from './ifilteredqueryable';
import { IWhereFilter } from './iwherefilter';
import { SoqlOrWhereFilter } from './soql-or-where-filter';
import { SoqlQuery } from './soql-query';
import { SoqlWhereFilter } from './soql-where-filter';

export class FilteredSoqlQuery<TEntity> extends SoqlQuery<TEntity> implements IFilteredQueryable<TEntity> {

  and<TValue extends ColumnType>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue> {
    return new SoqlWhereFilter(this, Column.of(column));
  }

  or<TValue extends ColumnType>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue> {
    return new SoqlOrWhereFilter(this, Column.of(column));
  }
}
