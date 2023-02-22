import { MultiPolygon, Point, Polygon, Position } from "geojson";

export class GeoJSONUtils {
  public static point(...position: Position): Point {
    return {
      type: "Point",
      coordinates: position,
    };
  }

  public static polygon(...coordinates: Position[]): Polygon {
    return {
      type: "Polygon",
      coordinates: [coordinates],
    };
  }

  public static multipolygon(...coordinates: Position[][]): MultiPolygon {
    return {
      type: "MultiPolygon",
      coordinates: [coordinates],
    };
  }
}
