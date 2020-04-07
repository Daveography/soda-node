import { OffsetClause } from "../../../src/soql-query-builder/clauses/offset-clause";

describe("Offset Clause", () => {

  it("should create basic limit clause", () => {
    const limit = new OffsetClause(100);
    expect(limit.toString()).toEqual("$offset=100");
  });

  it("should allow zero limit", () => {
    const limit = new OffsetClause(0);
    expect(limit.toString()).toEqual("");
  });

  it("should throw on negative limit", () => {
    const createFunc = () => new OffsetClause(-100);
    expect(createFunc).toThrow();
  });

  it("should throw on decimal limit", () => {
    const createFunc = () => new OffsetClause(1.5);
    expect(createFunc).toThrow();
  });
});
