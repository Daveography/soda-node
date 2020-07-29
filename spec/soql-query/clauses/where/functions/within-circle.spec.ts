import { Point } from "geojson";
import { Location } from "../../../../../src/datatypes/location";
import { Column } from "../../../../../src/soql-query/clauses/column";
import { WithinCircle } from "../../../../../src/soql-query/clauses/where/functions/within-circle";

describe("Within Circle Where Filter", () => {

  it("should throw on null column", () => {
    const createFunc = () => new WithinCircle(
      null,
      new Location(12.198599, -68.980986),
      500
    );
    expect(createFunc).toThrow();
  });

  it("should throw on null point", () => {
    const createFunc = () => new WithinCircle(
      new Column("col1"),
      null,
      500
    );
    expect(createFunc).toThrow();
  });

  it("should throw on null radius", () => {
    const createFunc = () => new WithinCircle(
      new Column("col1"),
      new Location(12.198599, -68.980986),
      null
    );
    expect(createFunc).toThrow();
  });

  it("should create within_circle where filter with Location", () => {
    const filterObj = new WithinCircle(
      new Column("col1"),
      new Location(53.528525, -113.501720),
      500
    );
    expect(filterObj.toString())
      .toEqual("within_circle(col1, 53.528525, -113.501720, 500)");
  });

  it("should create within_circle where filter with Point", () => {
    const point: Point = {
      type: "Point",
      coordinates: [
        -113.501720,
        53.528525
      ]
    };

    const filterObj = new WithinCircle(
      new Column("col1"),
      point,
      500
    );
    expect(filterObj.toString())
      .toEqual("within_circle(col1, 'POINT (-113.50172 53.528525)', 500)");
  });
});
