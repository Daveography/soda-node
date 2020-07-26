import { IClause, IWhereComponent } from '../soql-query-builder';
import { IFilteredQueryable } from './ifilteredqueryable';
import { IQueryable } from './iqueryable';

export interface IInternalQuery<TEntity> {
  addClause(newClause: IClause): IQueryable<TEntity>;
  addFilter(...filter: IWhereComponent[]): IFilteredQueryable<TEntity>;
}
