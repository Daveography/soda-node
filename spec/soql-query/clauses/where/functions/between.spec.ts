import { FloatingTimestamp } from '../../../../../src/datatypes/floating-timestamp';
import { Column } from "../../../../../src/soql-query/clauses/column";
import { Between } from "../../../../../src/soql-query/clauses/where/functions/between";

describe("Between Where Filter", () => {

  it("should throw on null column", () => {
    const createFunc = () => new Between(
      null,
      1,
      20
    );
    expect(createFunc).toThrow();
  });

  it("should throw on null from value", () => {
    const createFunc = () => new Between(
      new Column("col1"),
      null,
      20
    );
    expect(createFunc).toThrow();
  });

  it("should throw on null to value", () => {
    const createFunc = () => new Between(
      new Column("col1"),
      1,
      null
    );
    expect(createFunc).toThrow();
  });

  it("should create between where filter with numeric values", () => {
    const filterObj = new Between(
      new Column("col1"),
      1,
      20
      );
    expect(filterObj.toString())
      .toEqual("col1 between '1' and '20'");
  });

  it("should create between where filter for floating timestamp values", () => {
    const filterObj = new Between(
      new Column("col1"),
      new FloatingTimestamp("01/15/1999"),
      new FloatingTimestamp("09/05/2012")
    );
    expect(filterObj.toString())
      .toEqual("col1 between '1999-01-15T00:00:00.000' and '2012-09-05T00:00:00.000'");
  });
});
