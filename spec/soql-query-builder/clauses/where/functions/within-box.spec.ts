import { Point } from "geojson";
import { Location } from "../../../../../src/datatypes/location";
import { Column } from "../../../../../src/soql-query/clauses/column";
import { WithinBox } from "../../../../../src/soql-query/clauses/where/functions/within-box";

describe("Within Box Where Filter", () => {

  it("should create within_box where filter with Location", () => {
    const filterObj = new WithinBox(
      new Column("col1"),
      new Location(12.198599, -68.980986),
      new Location(12.066738, -68.804505)
      );
    expect(filterObj.toString())
      .toEqual("within_box(col1, 12.198599, -68.980986, 12.066738, -68.804505)");
  });

  it("should create within_box where filter with Point", () => {
    const point1: Point = {
      type: "Point",
      coordinates: [
        -68.980986,
        12.198599
      ]
    };

    const point2: Point = {
      type: "Point",
      coordinates: [
        -68.804505,
        12.066738
      ]
    };

    const filterObj = new WithinBox(
      new Column("col1"),
      point1,
      point2
      );
    expect(filterObj.toString())
      .toEqual("within_box(col1, 'POINT (-68.980986 12.198599)', 'POINT (-68.804505 12.066738)')");
  });
});
