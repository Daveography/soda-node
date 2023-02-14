import { Column } from "../../../../../src/soql-query/clauses/column";
import { NotLike } from "../../../../../src/soql-query/clauses/where/functions/not-like";
import { WhereValue } from "../../../../../src/soql-query/clauses/where/where-value";

describe("NotLike Where Filter", () => {
  const basicString = new WhereValue("Hello%");
  const singleWildcardCharacterString = new WhereValue("Hello _orld");
  const fullWildcardString = new WhereValue("%World%");

  it("should throw on null column", () => {
    // @ts-ignore TS2345
    const createFunc = () => new NotLike(null, basicString);
    expect(createFunc).toThrow();
  });

  it("should throw on null value", () => {
    // @ts-ignore TS2345
    const createFunc = () => new NotLike(new Column("col1"), null);
    expect(createFunc).toThrow();
  });

  it("should throw on empty value", () => {
    const createFunc = () =>
      new NotLike(new Column("col1"), new WhereValue(""));
    expect(createFunc).toThrow();
  });

  it("should create not like where filter for basic string value", () => {
    const filterObj = new NotLike(new Column("col1"), basicString);
    expect(filterObj.toString()).toEqual("col1 not like 'Hello%'");
  });

  it("should create not like where filter for single character wildcard", () => {
    const filterObj = new NotLike(
      new Column("col1"),
      singleWildcardCharacterString
    );
    expect(filterObj.toString()).toEqual("col1 not like 'Hello _orld'");
  });

  it("should create not like where filter for floating timestamp values", () => {
    const filterObj = new NotLike(new Column("col1"), fullWildcardString);
    expect(filterObj.toString()).toEqual("col1 not like '%World%'");
  });
});
