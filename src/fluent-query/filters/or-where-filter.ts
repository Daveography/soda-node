import { Operator, WhereFilter, WhereOperator } from '../../soql-query';
import { Comparitor } from "../../soql-query/clauses/where/comparitor";
import { WhereValue } from "../../soql-query/clauses/where/where-value";
import { IFilteredQueryable } from '../ifilteredqueryable';
import { BasicWhereFilter } from './basic-where-filter';

export class OrWhereFilter<TEntity, TValue> extends BasicWhereFilter<TEntity, TValue> {

  public equals(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.Equals, new WhereValue(value));
    return this.query.addFilter(new WhereOperator(Operator.Or), filter);
  }

  public greaterThan(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.GreaterThan, new WhereValue(value));
    return this.query.addFilter(new WhereOperator(Operator.Or), filter);
  }

  public lessThan(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.LessThan, new WhereValue(value));
    return this.query.addFilter(new WhereOperator(Operator.Or), filter);
  }

  public isNull(): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.IsNull);
    return this.query.addFilter(new WhereOperator(Operator.Or), filter);
  }

  public isNotNull(): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.IsNotNull);
    return this.query.addFilter(new WhereOperator(Operator.Or), filter);
  }
}
