import { LocationUtils } from "../../src/utilities/location-utils";
import { Location } from "../../src/datatypes/location";
import { Point } from "geojson";

describe("LocationUtils", () => {
  it("should return true for Location type", () => {
    const loc = new Location(53.528525, -113.50172);
    const isLoc = LocationUtils.isLocation(loc);
    expect(isLoc).toEqual(true);
  });

  it("should return false for Point type", () => {
    const loc: Point = {
      type: "Point",
      coordinates: [-68.980986, 12.198599],
    };

    const isLoc = LocationUtils.isLocation(loc);
    expect(isLoc).toEqual(false);
  });
});
