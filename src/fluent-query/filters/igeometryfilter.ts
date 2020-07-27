import { Geometry, MultiPolygon, Point } from 'geojson';
import { Meters } from '../../datatypes/metres';
import { IFilteredQueryable } from '../ifilteredqueryable';

export interface IGeometryFilter<TEntity> {
  intersects(geometry: Geometry): IFilteredQueryable<TEntity>;
  withinBox(start: Point, end: Point): IFilteredQueryable<TEntity>;
  withinCircle(point: Point, radius: Meters): IFilteredQueryable<TEntity>;
  withinPolygon(multiPolygon: MultiPolygon): IFilteredQueryable<TEntity>;
}
