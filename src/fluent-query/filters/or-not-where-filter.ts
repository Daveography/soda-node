import { Column, Operator, WhereFilter, WhereOperator } from '../../soql-query';
import { Comparitor } from "../../soql-query/clauses/where/comparitor";
import { WhereValue } from "../../soql-query/clauses/where/where-value";
import { IFilteredQueryable } from '../ifilteredqueryable';
import { IInternalQuery } from '../iinternalquery';
import { IWhereFilter } from './iwherefilter';

export class OrNotWhereFilter<TEntity, TValue> implements IWhereFilter<TEntity, TValue> {
  
  public constructor(protected readonly query: IInternalQuery<TEntity>, protected readonly column: Column) {
    if (!query) {
      throw new Error("query must be provided");
    }
    if (!column) {
      throw new Error("column must be provided");
    }
  }

  public equals(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.Equals, new WhereValue(value));
    return this.query.addFilter(new WhereOperator(Operator.Or), new WhereOperator(Operator.Not), filter);
  }

  public greaterThan(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.GreaterThan, new WhereValue(value));
    return this.query.addFilter(new WhereOperator(Operator.Or), new WhereOperator(Operator.Not), filter);
  }

  public lessThan(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.LessThan, new WhereValue(value));
    return this.query.addFilter(new WhereOperator(Operator.Or), new WhereOperator(Operator.Not), filter);
  }

  public isNull(): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.IsNull);
    return this.query.addFilter(new WhereOperator(Operator.Or), new WhereOperator(Operator.Not), filter);
  }

  public isNotNull(): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.IsNotNull);
    return this.query.addFilter(new WhereOperator(Operator.Or), new WhereOperator(Operator.Not), filter);
  }

  public not(): IWhereFilter<TEntity, TValue> {
    throw new Error('Double negatives are bad and you should feel bad for trying this');
  }
}
