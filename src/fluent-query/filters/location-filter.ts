import { Location } from '../../datatypes/location';
import { Meters } from '../../datatypes/metres';
import { Column } from '../../soql-query/clauses/column';
import { WithinBox } from '../../soql-query/clauses/where/functions/within-box';
import { WithinCircle } from '../../soql-query/clauses/where/functions/within-circle';
import { IFilteredQueryable } from '../ifilteredqueryable';
import { IInternalQuery } from '../iinternalquery';
import { ILocationFilter } from './ilocationfilter';
import { WhereOperator } from '../../soql-query/clauses/where/where-operator';
import { IWhereComponent } from 'src/soql-query';

export class LocationFilter<TEntity> implements ILocationFilter<TEntity> {
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

  public withinCircle(location: Location, radius: Meters): IFilteredQueryable<TEntity> {
    if (!location) {
      throw new Error("Location must be provided");
    }
    if (!radius) {
      throw new Error("Radius must be provided");
    }

    const filter = new WithinCircle(this.column, location, radius);
    return this.addFilter(filter);
  }

  public withinBox(start: Location, end: Location): IFilteredQueryable<TEntity> {
    if (!start) {
      throw new Error("Start location must be provided");
    }
    if (!end) {
      throw new Error("End location must be provided");
    }

    const filter = new WithinBox(this.column, start, end);
    return this.addFilter(filter);
  }

  private addFilter(filter: IWhereComponent): IFilteredQueryable<TEntity> {
    return this.query.addFilter(...this.prependOperators, filter);
  }
}
