import { Observable } from "rxjs";
import { ILocationFilter } from 'src/soql-query/ilocationfilter';
import { IQueryable } from 'src/soql-query/iqueryable';
import { IWhereFilter } from 'src/soql-query/iwherefilter';
import { Location } from '../datatypes/location';
import { SoqlQueryBuilder } from '../soql-query-builder';
import { SoqlQuery } from '../soql-query/soql-query';
import { SodaClient } from "./soda-client";
import { SodaContext } from "./soda-context";
import { SodaResourceId } from "./soda-resource-id";

export interface ISodaResource<TEntity> {
  id: SodaResourceId;
  context: SodaContext;
  client: SodaClient;
  getUrl(): string;
  observable(): Observable<TEntity[]>;
  get(query: SoqlQueryBuilder): Observable<TEntity[]>;
}

export class SodaResource<TEntity> implements ISodaResource<TEntity>, IQueryable<TEntity> {

  constructor(
    public readonly id: SodaResourceId,
    public readonly context: SodaContext,
    public readonly client: SodaClient
  ) { }

  public getUrl(): string {
    return `${this.context.host}resource/${this.id}.json`;
  }

  public observable(): Observable<TEntity[]> {
    return this.client.getResource(this);
  }

  public get(query: SoqlQueryBuilder): Observable<TEntity[]> {
    return this.client.getResource(this, query);
  }

  public select<TValue>(column: (type: TEntity) => TValue): IQueryable<TEntity> {
    return this.createQuery().select(column);
  }

  public where<TValue>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue> {
    return this.createQuery().where(column);
  }

  public whereLocation(column: (type: TEntity) => Location): ILocationFilter<TEntity> {
    return this.createQuery().whereLocation(column);}

  public limit(records: number): IQueryable<TEntity> {
    return this.createQuery().limit(records);
  }

  public offset(records: number): IQueryable<TEntity> {
    return this.createQuery().offset(records);
  }

  private createQuery(): SoqlQuery<TEntity> {
    return new SoqlQuery(this);
  }
}
