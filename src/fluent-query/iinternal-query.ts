import { IWhereComponent } from '../soql-query/index';
import { IFilteredQueryable } from './ifiltered-queryable';

export interface IInternalQuery<TEntity> {
  addFilter(...filter: IWhereComponent[]): IFilteredQueryable<TEntity>;
}
