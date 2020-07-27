import { Location } from '../../datatypes/location';
import { Meters } from '../../datatypes/metres';
import { Column } from '../../soql-query/clauses/column';
import { WithinBox } from '../../soql-query/clauses/where/functions/within-box';
import { WithinCircle } from '../../soql-query/clauses/where/functions/within-circle';
import { IFilteredQueryable } from '../ifilteredqueryable';
import { IInternalQuery } from '../iinternalquery';
import { ILocationFilter } from './ilocationfilter';

export class LocationFilter<TEntity> implements ILocationFilter<TEntity> {

  public constructor(protected readonly query: IInternalQuery<TEntity>, protected readonly column: Column) {
    if (!query) {
      throw new Error("queryBuilder must be provided");
    }
    if (!column) {
      throw new Error("column must be provided");
    }
  }

  public withinCircle(location: Location, radius: Meters): IFilteredQueryable<TEntity> {
    if (!location) {
      throw new Error("Location must be provided");
    }
    if (!radius) {
      throw new Error("Radius must be provided");
    }

    const filter = new WithinCircle(this.column, location, radius);
    return this.query.addFilter(filter);
  }

  public withinBox(start: Location, end: Location): IFilteredQueryable<TEntity> {
    if (!start) {
      throw new Error("Start location must be provided");
    }
    if (!end) {
      throw new Error("End location must be provided");
    }

    const filter = new WithinBox(this.column, start, end);
    return this.query.addFilter(filter);
  }
}
