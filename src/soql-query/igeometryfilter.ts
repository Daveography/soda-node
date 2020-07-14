import { Geometry, MultiPolygon, Point } from 'geojson';
import { Meters } from '../datatypes/metres';
import { IQueryable } from './iqueryable';

export interface IGeometryFilter<TEntity> {
  intersects(geometry: Geometry): IQueryable<TEntity>;
  withinBox(start: Point, end: Point): IQueryable<TEntity>;
  withinCircle(point: Point, radius: Meters): IQueryable<TEntity>;
  withinPolygon(multiPolygon: MultiPolygon): IQueryable<TEntity>;
}
