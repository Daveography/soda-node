import { Observable } from "rxjs";
import { IQueryable } from '../soql-query/iqueryable';
import { IWhereFilter } from '../soql-query/iwherefilter';
import { SoqlQuery } from '../soql-query/soql-query';
import { SodaClient } from "./soda-client";
import { SodaContext } from "./soda-context";
import { SodaResourceId } from "./soda-resource-id";

export interface ISodaResource<TEntity> {
  id: SodaResourceId;
  context: SodaContext;
  client: SodaClient;
  getResourceUrl(): string;
}

export class SodaResource<TEntity> implements ISodaResource<TEntity>, IQueryable<TEntity> {

  constructor(public readonly id: SodaResourceId, public readonly context: SodaContext, public readonly client: SodaClient) {
  }

  public getResourceUrl(): string {
    return `${this.context.host}resource/${this.id}.json`;
  }

  public toArray(): Observable<TEntity[]> {
    return this.client.getResource(this);
  }

  public select<TValue>(column: (type: TEntity) => TValue): IQueryable<TEntity> {
    return this.createQuery().select(column);
  }

  public where<TValue>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue> {
    return this.createQuery().where(column);
  }

  public limit(records: number): IQueryable<TEntity> {
    return this.createQuery().limit(records);
  }

  public offset(records: number): IQueryable<TEntity> {
    return this.createQuery().offset(records);
  }

  private createQuery(): SoqlQuery<TEntity> {
    return new SoqlQuery(this)
  }
}
