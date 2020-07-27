import { Comparitor, Operator, WhereFilter, WhereOperator, WhereValue } from '../../soql-query-builder';
import { IFilteredQueryable } from '../ifilteredqueryable';
import { BasicWhereFilter } from './basic-where-filter';

export class AndWhereFilter<TEntity, TValue> extends BasicWhereFilter<TEntity, TValue> {

  public equals(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.Equals, new WhereValue(value));
    return this.query.addFilter(new WhereOperator(Operator.And), filter);
  }

  public greaterThan(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.GreaterThan, new WhereValue(value));
    return this.query.addFilter(new WhereOperator(Operator.And), filter);
  }

  public lessThan(value: TValue): IFilteredQueryable<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    const filter = new WhereFilter(this.column, Comparitor.LessThan, new WhereValue(value));
    return this.query.addFilter(new WhereOperator(Operator.And), filter);
  }

  public isNull(): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.IsNull);
    return this.query.addFilter(new WhereOperator(Operator.And), filter);
  }

  public isNotNull(): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.IsNotNull);
    return this.query.addFilter(new WhereOperator(Operator.Or), filter);
  }
}
