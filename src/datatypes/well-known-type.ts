import { Geometry } from "geojson";
import { geojsonToWKT } from "@terraformer/wkt";

export class WellKnownType {
  public Geometry: Geometry;

  constructor(geometry: Geometry) {
    if (!geometry) {
      throw new Error("Geometry must be provided");
    }

    this.Geometry = geometry;
  }

  toString(): string {
    return geojsonToWKT(this.Geometry);
  }
}
