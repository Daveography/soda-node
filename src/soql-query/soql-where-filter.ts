import { WhereClause, WhereFilter } from '../soql-query-builder';
import { Column } from "../soql-query-builder/clauses/column";
import { Comparitor } from "../soql-query-builder/clauses/where/comparitor";
import { WhereValue } from "../soql-query-builder/clauses/where/where-value";
import { IQueryable } from './iqueryable';
import { IWhereFilter } from './iwherefilter';
import { SoqlQuery } from './soql-query';

export class SoqlWhereFilter<TEntity, TValue> implements IWhereFilter<TEntity, TValue> {

  public constructor(private readonly query: SoqlQuery<TEntity>, private readonly column: Column) {
    if (!query) {
      throw new Error("queryBuilder must be provided");
    }
    if (!column) {
      throw new Error("column must be provided");
    }
  }

  public equals(value: TValue): IQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const clause = new WhereClause(new WhereFilter(this.column, Comparitor.Equals, new WhereValue(value)));
    return this.query.addClause(clause);
  }

  public greaterThan(value: TValue): IQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const clause = new WhereClause(new WhereFilter(this.column, Comparitor.GreaterThan, new WhereValue(value)));
    return this.query.addClause(clause);
  }

  public lessThan(value: TValue): IQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const clause = new WhereClause(new WhereFilter(this.column, Comparitor.LessThan, new WhereValue(value)));
    return this.query.addClause(clause);
  }

  public isNull(): IQueryable<TEntity> {
    const clause = new WhereClause(new WhereFilter(this.column, Comparitor.IsNull));
    return this.query.addClause(clause);
  }

  public isNotNull(): IQueryable<TEntity> {
    const clause = new WhereClause(new WhereFilter(this.column, Comparitor.IsNotNull));

    return this.query.addClause(clause);
  }
}
