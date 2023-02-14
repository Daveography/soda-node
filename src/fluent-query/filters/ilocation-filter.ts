import { Location } from '../../datatypes/location';
import { Meters } from '../../datatypes/metres';
import { IFilteredQueryable } from '../ifiltered-queryable';

export interface ILocationFilter<TEntity> {
  withinBox(start: Location, end: Location): IFilteredQueryable<TEntity>;
  withinCircle(location: Location, radius: Meters): IFilteredQueryable<TEntity>;
}
