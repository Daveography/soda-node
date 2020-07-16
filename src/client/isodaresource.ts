import { Observable } from 'rxjs';
import { SoqlQueryBuilder } from 'src/soql-query-builder';
import { SodaContext } from '.';
import { SodaResourceId } from './soda-resource-id';

export interface ISodaResource<TEntity> {
  Id: SodaResourceId;
  Context: SodaContext;
  getUrl(): string;
  observable(): Observable<TEntity[]>;
  get(query: SoqlQueryBuilder): Observable<TEntity[]>;
}
