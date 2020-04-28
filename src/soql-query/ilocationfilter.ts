import { Location } from '../datatypes/location';
import { IQueryable } from './iqueryable';
import { Meters } from '../datatypes/metres';

export interface ILocationFilter<TEntity> {
  withinBox(start: Location, end: Location): IQueryable<TEntity>;
  withinCircle(location: Location, radius: Meters): IQueryable<TEntity>;
}
