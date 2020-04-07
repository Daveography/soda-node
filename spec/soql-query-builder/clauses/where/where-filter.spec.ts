import { FloatingTimestamp } from "../../../../src/datatypes/floating-timestamp";
import { Column } from "../../../../src/soql-query-builder/clauses/column";
import { Comparitor } from "../../../../src/soql-query-builder/clauses/where/comparitor";
import { WhereFilter } from "../../../../src/soql-query-builder/clauses/where/where-filter";
import { WhereValue } from "../../../../src/soql-query-builder/clauses/where/where-value";

describe("Where Filters", () => {

  it("should create equals where filter", () => {
    const filterObj = new WhereFilter(
      new Column("col1"),
      Comparitor.Equals,
      new WhereValue("test"),
      );
    expect(decodeURIComponent(filterObj.toString()))
      .toEqual("col1 = 'test'");
  });

  it("should create greater than where filter", () => {
    const filterObj = new WhereFilter(
      new Column("col1"),
      Comparitor.GreaterThan,
      new WhereValue("3.0"),
    );
    expect(decodeURIComponent(filterObj.toString()))
      .toEqual("col1 > '3.0'");
  });

  it("should create less than where filter with numeric value", () => {
    const filterObj = new WhereFilter(
      new Column("col1"),
      Comparitor.LessThan,
      new WhereValue(3.1),
    );
    expect(decodeURIComponent(filterObj.toString()))
      .toEqual("col1 < '3.1'");
  });

  it("should create greater than where filter with FloatingTimestamp value", () => {
    const now = new FloatingTimestamp("04/23/1982 GMT");
    const filterObj = new WhereFilter(
      new Column("col1"),
      Comparitor.GreaterThan,
      new WhereValue(now),
    );
    expect(decodeURIComponent(filterObj.toString()))
      .toEqual("col1 > '1982-04-23T00:00:00.000Z'");
  });

  it("should create is null where filter", () => {
    const filterObj = new WhereFilter(
      new Column("col1"),
      Comparitor.IsNull,
    );
    expect(decodeURIComponent(filterObj.toString()))
      .toEqual("col1 IS NULL");
  });

  it("should create is not null where filter", () => {
    const filterObj = new WhereFilter(
      new Column("col1"),
      Comparitor.IsNotNull,
    );
    expect(decodeURIComponent(filterObj.toString()))
      .toEqual("col1 IS NOT NULL");
  });

  it("should not accept a value if testing is null", () => {
    const createFunc = () =>
      new WhereFilter(
        new Column("col1"),
        Comparitor.IsNull,
        new WhereValue("test"),
      );

    expect(createFunc).toThrow();
  });

  it("should not accept a value if testing is not null", () => {
    const createFunc = () =>
      new WhereFilter(
        new Column("col1"),
        Comparitor.IsNotNull,
        new WhereValue("test"),
      );

    expect(createFunc).toThrow();
  });

});
