import { WhereStringValue } from "../../../../src/soql/clauses/where/where-string-value";

describe("Where String Values", () => {

  it("should create where value and return quoted value", () => {
    const value = "any string";
    const valueObj = new WhereStringValue(value);
    expect(decodeURIComponent(valueObj.toString()))
      .toEqual("'any string'");
  });

  it("should not allow empty value", () => {
    const createFunc = () => new WhereStringValue("");
    expect(createFunc).toThrow();
  });

  it("should not allow null value", () => {
    const createFunc = () => new WhereStringValue(null);
    expect(createFunc).toThrow();
  });
});
