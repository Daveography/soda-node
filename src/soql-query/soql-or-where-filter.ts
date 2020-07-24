import { Operator, WhereFilter, WhereOperator } from '../soql-query-builder';
import { Comparitor } from "../soql-query-builder/clauses/where/comparitor";
import { WhereValue } from "../soql-query-builder/clauses/where/where-value";
import { IFilteredQueryable } from './ifilteredqueryable';
import { SoqlWhereFilter } from './soql-where-filter';

export class SoqlOrWhereFilter<TEntity, TValue> extends SoqlWhereFilter<TEntity, TValue> {

  public equals(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.Equals, new WhereValue(value));
    this.query.addFilter(new WhereOperator(Operator.Or))
    return this.query.addFilter(filter);
  }

  public greaterThan(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.GreaterThan, new WhereValue(value));
    this.query.addFilter(new WhereOperator(Operator.Or))
    return this.query.addFilter(filter);
  }

  public lessThan(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.LessThan, new WhereValue(value));
    this.query.addFilter(new WhereOperator(Operator.Or))
    return this.query.addFilter(filter);
  }

  public isNull(): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.IsNull);
    this.query.addFilter(new WhereOperator(Operator.Or))
    return this.query.addFilter(filter);
  }

  public isNotNull(): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.IsNotNull);
    this.query.addFilter(new WhereOperator(Operator.Or))
    return this.query.addFilter(filter);
  }
}
