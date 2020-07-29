import { Operator, WhereFilter, WhereOperator } from '../../soql-query';
import { Column } from "../../soql-query/clauses/column";
import { Comparitor } from "../../soql-query/clauses/where/comparitor";
import { WhereValue } from "../../soql-query/clauses/where/where-value";
import { IFilteredQueryable } from '../ifilteredqueryable';
import { IInternalQuery } from '../iinternalquery';
import { IWhereFilter } from './iwherefilter';

export class BasicWhereFilter<TEntity, TValue> implements IWhereFilter<TEntity, TValue> {
  private prependOperators: WhereOperator[];

  public constructor(
    protected readonly query: IInternalQuery<TEntity>,
    protected readonly column: Column,
    ...prependOperators: WhereOperator[]
  ) {
    if (!query) {
      throw new Error("query must be provided");
    }
    if (!column) {
      throw new Error("column must be provided");
    }

    this.prependOperators = prependOperators;
  }

  public equals(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.Equals, new WhereValue(value));
    return this.addFilter(filter);
  }

  public greaterThan(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.GreaterThan, new WhereValue(value));
    return this.addFilter(filter);
  }

  public lessThan(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.LessThan, new WhereValue(value));
    return this.addFilter(filter);
  }

  public isNull(): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.IsNull);
    return this.addFilter(filter);
  }

  public isNotNull(): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.IsNotNull);
    return this.addFilter(filter);
  }

  public not(): IWhereFilter<TEntity, TValue> {
    if (this.checkIfAlreadyNotted()) {
      throw new Error('Double negatives are bad and you should feel bad for trying this');
    }

    return new BasicWhereFilter(this.query, this.column, ...this.prependOperators, new WhereOperator(Operator.Not));
  }

  private checkIfAlreadyNotted() {
    return this.prependOperators.length > 0 && this.prependOperators[this.prependOperators.length - 1].Operator === Operator.Not;
  }

  private addFilter(filter: WhereFilter<TValue | unknown>): IFilteredQueryable<TEntity> {
    return this.query.addFilter(...this.prependOperators, filter);
  }
}
