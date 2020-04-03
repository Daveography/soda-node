import { Observable } from "rxjs";
import { InternalSoqlQueryBuilder } from "../soql/query-builder/internal-soql-query-builder";
import { ISoqlQueryBuilder } from "../soql/query-builder/soql-query-builder";
import { WhereFilterBuilder } from "../soql/query-builder/where-filter-builder";
import { SodaClient } from "./soda-client";
import { SodaContext } from "./soda-context";
import { SodaResourceId } from "./soda-resource-id";

export interface ISodaResource<TEntity> {
  id: SodaResourceId;
  context: SodaContext;
  getResourceUrl(): string;
  getAll(): Observable<TEntity[]>;
}

export class SodaResource<TEntity> implements ISodaResource<TEntity>, ISoqlQueryBuilder<TEntity> {
  private readonly queryBuilder: InternalSoqlQueryBuilder<TEntity>;

  constructor(readonly id: SodaResourceId, readonly context: SodaContext, readonly client: SodaClient) {
    this.queryBuilder = new InternalSoqlQueryBuilder();
  }

  public getResourceUrl(): string {
    return `${this.context.host}resource/${this.id}.json`;
  }

  public getAll(): Observable<TEntity[]> {
    return this.client.getResource(this);
  }

  public select<TValue>(column: (type: TEntity) => TValue): this {
    this.queryBuilder.select(column);
    return this;
  }

  public where<TValue>(column: (type: TEntity) => TValue): WhereFilterBuilder<TEntity> {
    return this.where(column);
  }

  public limit(records: number): this {
    this.queryBuilder.limit(records);
    return this;
  }

  public offset(records: number): this {
    this.queryBuilder.offset(records);
    return this;
  }
}
