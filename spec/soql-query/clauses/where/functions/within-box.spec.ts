import { Point } from "geojson";
import { Location } from "../../../../../src/datatypes/location";
import { Column } from "../../../../../src/soql-query/clauses/column";
import { WithinBox } from "../../../../../src/soql-query/clauses/where/functions/within-box";
import { WhereValue } from "../../../../../src/soql-query/clauses/where/where-value";

describe("Within Box Where Filter", () => {
  const loc1 = new WhereValue(new Location(12.198599, -68.980986));
  const loc2 = new WhereValue(new Location(12.066738, -68.804505));

  it("should throw on null column", () => {
    // @ts-ignore TS2345
    const createFunc = () => new WithinBox(null, loc1, loc2);
    expect(createFunc).toThrow();
  });

  it("should throw on null start point", () => {
    // @ts-ignore TS2345
    const createFunc = () => new WithinBox(new Column("col1"), null, loc2);
    expect(createFunc).toThrow();
  });

  it("should throw on null end point", () => {
    // @ts-ignore TS2345
    const createFunc = () => new WithinBox(new Column("col1"), loc1, null);
    expect(createFunc).toThrow();
  });

  it("should create within_box where filter with Location", () => {
    const filterObj = new WithinBox(new Column("col1"), loc1, loc2);
    expect(filterObj.toString()).toEqual(
      "within_box(col1, 12.198599, -68.980986, 12.066738, -68.804505)"
    );
  });

  it("should create within_box where filter with Point", () => {
    const point1: Point = {
      type: "Point",
      coordinates: [-68.980986, 12.198599],
    };

    const point2: Point = {
      type: "Point",
      coordinates: [-68.804505, 12.066738],
    };

    const filterObj = new WithinBox(
      new Column("col1"),
      new WhereValue(point1),
      new WhereValue(point2)
    );
    expect(filterObj.toString()).toEqual(
      "within_box(col1, 'POINT (-68.980986 12.198599)', 'POINT (-68.804505 12.066738)')"
    );
  });
});
