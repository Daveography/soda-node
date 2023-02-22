import { Point } from "geojson";
import { Coordinate } from "./coordinate";

const PRECISION_DIGITS = 6;

export class Location {
  public readonly Latitude: Coordinate;
  public readonly Longitude: Coordinate;

  constructor(latitude: Coordinate, longitude: Coordinate) {
    if (latitude === null) {
      throw new Error("Latitude must be provided");
    }
    if (longitude === null) {
      throw new Error("Longitude must be provided");
    }
    if (latitude > 90 || latitude < -90) {
      throw new Error("Latitude must be a valid value between -90.0 and 90.0");
    }
    if (longitude > 180 || longitude < -180) {
      throw new Error(
        "Longitude must be a valid value between -180.0 and 180.0"
      );
    }

    this.Latitude = latitude;
    this.Longitude = longitude;
  }

  toString(): string {
    return `${this.Latitude.toFixed(
      PRECISION_DIGITS
    )}, ${this.Longitude.toFixed(PRECISION_DIGITS)}`;
  }

  public static isLocation(spot: Location | Point): spot is Location {
    return (spot as Location).Latitude !== undefined;
  }
}
