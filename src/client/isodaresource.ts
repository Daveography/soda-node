import { Observable } from 'rxjs';
import { SodaContext } from '.';
import { SoqlQuery } from '../soql-query';
import { SodaResourceId } from './soda-resource-id';

export interface ISodaResource<TEntity> {
  Id: SodaResourceId;
  Context: SodaContext;
  getUrl(): string;
  observable(): Observable<TEntity[]>;
  get(query: SoqlQuery): Observable<TEntity[]>;
}
