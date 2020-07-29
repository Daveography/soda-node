import { Column } from "../../../../../src/soql-query/clauses/column";
import { Like } from '../../../../../src/soql-query/clauses/where/functions/like';

describe("Like Where Filter", () => {
  const basicString = "Hello%";
  const singleWildcardCharacterString = "Hello _orld";
  const fullWildcardString = "%World%";

  it("should throw on null column", () => {
    const createFunc = () => new Like(
      null,
      basicString
    );
    expect(createFunc).toThrow();
  });

  it("should throw on null value", () => {
    const createFunc = () => new Like(
      new Column("col1"),
      null
    );
    expect(createFunc).toThrow();
  });

  it("should throw on empty value", () => {
    const createFunc = () => new Like(
      new Column("col1"),
      ""
    );
    expect(createFunc).toThrow();
  });

  it("should create like where filter for basic string value", () => {
    const filterObj = new Like(
      new Column("col1"),
      basicString
    );
    expect(filterObj.toString())
      .toEqual("col1 like 'Hello%'");
  });

  it("should create in where filter for single character wildcard", () => {
    const filterObj = new Like(
      new Column("col1"),
      singleWildcardCharacterString
    );
    expect(filterObj.toString())
      .toEqual("col1 like 'Hello _orld'");
  });

  it("should create in where filter for floating timestamp values", () => {
    const filterObj = new Like(
      new Column("col1"),
      fullWildcardString
    );
    expect(filterObj.toString())
      .toEqual("col1 like '%World%'");
  });
});
