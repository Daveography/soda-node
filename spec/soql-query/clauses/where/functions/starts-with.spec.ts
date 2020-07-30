import { Column } from "../../../../../src/soql-query/clauses/column";
import { StartsWith } from '../../../../../src/soql-query/clauses/where/functions/starts-with';
import { WhereValue } from '../../../../../src/soql-query/clauses/where/where-value';

describe("StartsWith Where Filter", () => {
  const basicString = new WhereValue("Hello");

  it("should throw on null column", () => {
    const createFunc = () => new StartsWith(
      null,
      basicString
    );
    expect(createFunc).toThrow();
  });

  it("should throw on null value", () => {
    const createFunc = () => new StartsWith(
      new Column("col1"),
      null
    );
    expect(createFunc).toThrow();
  });

  it("should throw on empty value", () => {
    const createFunc = () => new StartsWith(
      new Column("col1"),
      new WhereValue("")
    );
    expect(createFunc).toThrow();
  });

  it("should create startswith where filter for basic string value", () => {
    const filterObj = new StartsWith(
      new Column("col1"),
      basicString
    );
    expect(filterObj.toString())
      .toEqual("starts_with(col1, 'Hello')");
  });
});
