import { Column } from "../../../../src/soql-query-builder/clauses/column";
import { Comparitor } from "../../../../src/soql-query-builder/clauses/where/comparitor";
import { WhereFilter } from "../../../../src/soql-query-builder/clauses/where/where-filter";
import { WhereStringValue } from "../../../../src/soql-query-builder/clauses/where/where-string-value";

describe("Where Filters", () => {

  it("should create equals where filter", () => {
    const filterObj = new WhereFilter(
      new Column("col1"),
      Comparitor.Equals,
      new WhereStringValue("test"),
      );
    expect(decodeURIComponent(filterObj.toString()))
      .toEqual("col1 = 'test'");
  });

  it("should create greater than where filter", () => {
    const filterObj = new WhereFilter(
      new Column("col1"),
      Comparitor.GreaterThan,
      new WhereStringValue("3.0"),
    );
    expect(decodeURIComponent(filterObj.toString()))
      .toEqual("col1 > '3.0'");
  });

  it("should create less than where filter", () => {
    const filterObj = new WhereFilter(
      new Column("col1"),
      Comparitor.LessThan,
      new WhereStringValue("3.0"),
    );
    expect(decodeURIComponent(filterObj.toString()))
      .toEqual("col1 < '3.0'");
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
        new WhereStringValue("test"),
      );

    expect(createFunc).toThrow();
  });

  it("should not accept a value if testing is not null", () => {
    const createFunc = () =>
      new WhereFilter(
        new Column("col1"),
        Comparitor.IsNotNull,
        new WhereStringValue("test"),
      );

    expect(createFunc).toThrow();
  });

});
