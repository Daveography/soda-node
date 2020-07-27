import { IClause, IWhereComponent } from '../soql-query';
import { IFilteredQueryable } from './ifilteredqueryable';
import { IQueryable } from './iqueryable';

export interface IInternalQuery<TEntity> {
  addClause(newClause: IClause): IQueryable<TEntity>;
  addFilter(...filter: IWhereComponent[]): IFilteredQueryable<TEntity>;
}
