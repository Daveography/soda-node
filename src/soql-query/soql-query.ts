import { Observable } from 'rxjs';
import { ISodaResource } from '../client';
import { IClause, SelectClause, WhereFilter } from "../soql-query-builder/clauses";
import { Column } from "../soql-query-builder/clauses/column";
import { LimitClause } from "../soql-query-builder/clauses/limit-clause";
import { OffsetClause } from "../soql-query-builder/clauses/offset-clause";
import { ImmutableSoqlQueryBuilder } from '../soql-query-builder/immutable-soql-query-builder';
import { IQueryable } from './iqueryable';
import { IWhereFilter } from './iwherefilter';
import { SoqlWhereFilter } from './soql-where-filter';

export class SoqlQuery<TEntity> implements IQueryable<TEntity> {

  constructor(readonly sodaResource: ISodaResource<TEntity>, private readonly queryBuilder?: ImmutableSoqlQueryBuilder) {
    if (!sodaResource) {
      throw new Error("resource must be provided");
    }

    if (!queryBuilder) {
      this.queryBuilder = new ImmutableSoqlQueryBuilder();
    }
  }

  // TODO: Add overload to accept multiple columns as parameters
  public select<TValue>(column: (type: TEntity) => TValue): IQueryable<TEntity> {
    return this.addClause(new SelectClause(Column.of(column)));
  }

  public where<TValue>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue> {
    return new SoqlWhereFilter(this, Column.of(column));
  }

  public limit(records: number): IQueryable<TEntity> {
    return this.addClause(new LimitClause(records));
  }

  public offset(records: number): IQueryable<TEntity> {
    return this.addClause(new OffsetClause(records));
  }

  public toArray(): Observable<TEntity[]> {
    return this.sodaResource.client.getResource(this.sodaResource, this);
  }

  public toString(): string {
    return this.queryBuilder.toString();
  }

  public addClause(newClause: IClause): SoqlQuery<TEntity> {
    const newBuilder = this.queryBuilder.addClause(newClause);
    return new SoqlQuery<TEntity>(this.sodaResource, newBuilder);
  }

  public addFilter<TValue>(filter: WhereFilter<TValue>): SoqlQuery<TEntity> {
    const newBuilder = this.queryBuilder.addFilter(filter);
    return new SoqlQuery<TEntity>(this.sodaResource, newBuilder);
  }
}
