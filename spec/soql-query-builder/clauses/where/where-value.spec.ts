import { WhereValue } from "../../../../src/soql-query-builder/clauses/where/where-value";

describe("Where String Values", () => {

  it("should create where value and return quoted value", () => {
    const value = "any string";
    const valueObj = new WhereValue(value);
    expect(decodeURIComponent(valueObj.toString()))
      .toEqual("'any string'");
  });

  it("should create where numeric value and return quoted value", () => {
    const value = 1234;
    const valueObj = new WhereValue(value);
    expect(decodeURIComponent(valueObj.toString()))
      .toEqual("'1234'");
  });

  it("should not allow null value", () => {
    const createFunc = () => new WhereValue(null);
    expect(createFunc).toThrow();
  });
});
