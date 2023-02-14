import { WhereValue } from "../../../../src/soql-query/clauses/where/where-value";

describe("Where String Values", () => {
  it("should create where value and return quoted value", () => {
    const value = "any string";
    const valueObj = new WhereValue(value);
    expect(valueObj.toString()).toEqual("'any string'");
  });

  it("should create where numeric value and return quoted value", () => {
    const value = 1234;
    const valueObj = new WhereValue(value);
    expect(valueObj.toString()).toEqual("'1234'");
  });

  it("should not allow null value", () => {
    // @ts-ignore TS2345
    const createFunc = () => new WhereValue(null);
    expect(createFunc).toThrow();
  });
});
