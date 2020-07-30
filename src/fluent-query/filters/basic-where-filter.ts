import { Column } from "../../soql-query/clauses/column";
import { ColumnType } from '../../soql-query/clauses/column-types';
import { Comparitor } from "../../soql-query/clauses/where/comparitor";
import { Between } from '../../soql-query/clauses/where/functions/between';
import { BetweenFunctionType } from '../../soql-query/clauses/where/functions/between-function-types';
import { In } from '../../soql-query/clauses/where/functions/in';
import { InFunctionType } from '../../soql-query/clauses/where/functions/in-function-types';
import { Like } from '../../soql-query/clauses/where/functions/like';
import { NotBetween } from '../../soql-query/clauses/where/functions/not-between';
import { NotIn } from '../../soql-query/clauses/where/functions/not-in';
import { NotLike } from '../../soql-query/clauses/where/functions/not-like';
import { StartsWith } from '../../soql-query/clauses/where/functions/starts-with';
import { Operator } from '../../soql-query/clauses/where/operator';
import { IWhereComponent } from '../../soql-query/clauses/where/where-component';
import { WhereFilter } from '../../soql-query/clauses/where/where-filter';
import { WhereOperator } from '../../soql-query/clauses/where/where-operator';
import { WhereValue } from "../../soql-query/clauses/where/where-value";
import { IFilteredQueryable } from '../ifilteredqueryable';
import { IInternalQuery } from '../iinternalquery';
import { IWhereFilter } from './iwherefilter';

export class BasicWhereFilter<TEntity, TValue extends ColumnType> implements IWhereFilter<TEntity, TValue> {
  private prependOperators: WhereOperator[];

  public constructor(
    protected readonly query: IInternalQuery<TEntity>,
    protected readonly column: Column,
    ...prependOperators: WhereOperator[]
  ) {
    if (!query) {
      throw new Error("Query must be provided");
    }
    if (!column) {
      throw new Error("Column must be provided");
    }

    this.prependOperators = prependOperators;
  }

  public equals(value: TValue): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.Equals, new WhereValue(value));
    return this.addFilter(filter);
  }

  public greaterThan(value: TValue): IFilteredQueryable<TEntity> {
    const filter = new WhereFilter(this.column, Comparitor.GreaterThan, new WhereValue(value));
    return this.addFilter(filter);
  }

  public lessThan(value: TValue): IFilteredQueryable<TEntity> {
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
  
  public between<TValue extends BetweenFunctionType>(from: TValue, to: TValue): IFilteredQueryable<TEntity> {
    const filter = new Between(this.column, new WhereValue(from), new WhereValue(to));
    return this.addFilter(filter);
  }
  
  public notBetween<TValue extends BetweenFunctionType>(from: TValue, to: TValue): IFilteredQueryable<TEntity> {
    const filter = new NotBetween(this.column, new WhereValue(from), new WhereValue(to));
    return this.addFilter(filter);
  }

  public in<TValue extends InFunctionType>(...values: TValue[]): IFilteredQueryable<TEntity> {
    if (!values || values.length === 0) {
      throw new Error("Values must be provided");
    }

    const filter = new In(this.column, values.map(v => new WhereValue(v)));
    return this.addFilter(filter);
  }

  public notIn<TValue extends InFunctionType>(...values: TValue[]): IFilteredQueryable<TEntity> {
    if (!values || values.length === 0) {
      throw new Error("Values must be provided");
    }

    const filter = new NotIn(this.column, values.map(v => new WhereValue(v)));
    return this.addFilter(filter);
  }

  public like(value: string): IFilteredQueryable<TEntity> {
    const filter = new Like(this.column, new WhereValue(value));
    return this.addFilter(filter);
  }

  public notLike(value: string): IFilteredQueryable<TEntity> {
    const filter = new NotLike(this.column, new WhereValue(value));
    return this.addFilter(filter);
  }

  public startsWith(value: string): IFilteredQueryable<TEntity> {
    const filter = new StartsWith(this.column, new WhereValue(value));
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

  private addFilter(filter: IWhereComponent): IFilteredQueryable<TEntity> {
    return this.query.addFilter(...this.prependOperators, filter);
  }
}
