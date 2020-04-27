import { Location } from "../../../../../src/datatypes/location";
import { Column } from "../../../../../src/soql-query-builder/clauses/column";
import { WithinBox } from "../../../../../src/soql-query-builder/clauses/where/functions/within-box";

describe("Within Box Where Filter", () => {

  it("should create within_box where filter", () => {
    const filterObj = new WithinBox(
      new Column("col1"),
      new Location(12.198599, -68.980986),
      new Location(12.066738, -68.804505)
      );
    expect(filterObj.toString())
      .toEqual("within_box(col1, 12.198599, -68.980986, 12.066738, -68.804505)");
  });
});
