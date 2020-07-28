import { IWhereComponent } from '../soql-query';
import { IFilteredQueryable } from './ifilteredqueryable';

export interface IInternalQuery<TEntity> {
  addFilter(...filter: IWhereComponent[]): IFilteredQueryable<TEntity>;
}
