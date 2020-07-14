import { Point } from 'geojson';
import { Location } from '../datatypes/location';

export class LocationUtils {
  public static isLocation(spot: Location | Point): spot is Location {
    return (spot as Location).Latitude !== undefined;
  }
}