import { Observable } from 'rxjs';
import { SodaContext } from './';
import { SoqlQuery, SoqlQueryBuilder } from '../soql-query';
import { SodaResourceId } from './soda-resource-id';

export interface ISodaResource<TEntity> {
  Id: SodaResourceId;
  Context: SodaContext;
  getUrl(): string;
  observable(): Observable<TEntity[]>;
  get(query: SoqlQuery | SoqlQueryBuilder): Observable<TEntity[]>;
}
