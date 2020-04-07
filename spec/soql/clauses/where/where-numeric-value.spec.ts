import { WhereNumericValue } from "../../../../src/soql-query-builder/clauses/where/where-numeric-value";

describe("Where Numeric Values", () => {

  it("should create where value and return quoted value", () => {
    const value = 1234;
    const valueObj = new WhereNumericValue(value);
    expect(decodeURIComponent(valueObj.toString()))
      .toEqual("'1234'");
  });

  it("should not allow null value", () => {
    const createFunc = () => new WhereNumericValue(null);
    expect(createFunc).toThrow();
  });
});
