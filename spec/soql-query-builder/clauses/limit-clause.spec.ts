import { LimitClause } from "../../../src/soql-query/clauses/limit-clause";

describe("Limit Clause", () => {

  it("should create basic limit clause", () => {
    const limit = new LimitClause(100);
    expect(limit.toString()).toEqual("$limit=100");
  });

  it("should throw on zero limit", () => {
    const createFunc = () => new LimitClause(0);
    expect(createFunc).toThrow();
  });

  it("should throw on negative limit", () => {
    const createFunc = () => new LimitClause(-100);
    expect(createFunc).toThrow();
  });

  it("should throw on decimal limit", () => {
    const createFunc = () => new LimitClause(1.5);
    expect(createFunc).toThrow();
  });
});
