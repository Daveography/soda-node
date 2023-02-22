import { Location } from "../../src/datatypes/location";
import { Point } from "geojson";

describe("Location", () => {
  it("should throw if missing latitude", () => {
    // @ts-ignore TS2345
    const createFunc = () => new Location(null, -113.50172);
    expect(createFunc).toThrow();
  });

  it("should throw if missing longitude", () => {
    // @ts-ignore TS2345
    const createFunc = () => new Location(53.528525, null);
    expect(createFunc).toThrow();
  });

  it("should output coordinate pair on toString", () => {
    const loc = new Location(53.528525, -113.50172);

    expect(loc.toString()).toEqual("53.528525, -113.501720");
  });

  it("should set precision to six digits on toString", () => {
    let loc = new Location(3.942386342, 13.368620378);

    expect(loc.toString()).toEqual("3.942386, 13.368620");

    loc = new Location(-33.871, 151.2);

    expect(loc.toString()).toEqual("-33.871000, 151.200000");
  });

  it("should throw on latitudes beyond 90 degrees", () => {
    let createFunc = () => new Location(90.5, 0);
    expect(createFunc).toThrow();

    createFunc = () => new Location(-91, 0);
    expect(createFunc).toThrow();
  });

  it("should throw on longitudes beyond 180 degrees", () => {
    let createFunc = () => new Location(0, -180.5);
    expect(createFunc).toThrow();

    createFunc = () => new Location(0, 180.1);
    expect(createFunc).toThrow();
  });

  it("should return true for Location type", () => {
    const loc = new Location(53.528525, -113.50172);
    const isLoc = Location.isLocation(loc);
    expect(isLoc).toEqual(true);
  });

  it("should return false for Point type", () => {
    const loc: Point = {
      type: "Point",
      coordinates: [-68.980986, 12.198599],
    };

    const isLoc = Location.isLocation(loc);
    expect(isLoc).toEqual(false);
  });
});
