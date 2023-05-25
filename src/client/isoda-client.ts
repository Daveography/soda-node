import { IQueryable } from '../fluent-query/iqueryable';
import { SoqlQuery } from '../soql-query/index';
import { ISodaResource } from "./isoda-resource";


export interface ISodaClient {
  getResource<TEntity>(resource: ISodaResource<TEntity>, query?: IQueryable<TEntity> | SoqlQuery): Promise<TEntity[]>;
}
