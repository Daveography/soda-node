import { Geometry } from 'geojson';
import * as WKT from 'terraformer-wkt-parser';

export class WellKnownType {
  public Geometry: Geometry;

  constructor(geometry: Geometry) {
    if (!geometry) {
      throw new Error("Geometry must be provided");
    }
    
    this.Geometry = geometry;
  }

  toString(): string {
    return WKT.convert(this.Geometry);
  }
}
