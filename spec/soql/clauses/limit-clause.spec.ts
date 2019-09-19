import { LimitClause } from "../../../src/soql/clauses/limit-clause";

describe('Limit Clause', () => {

  it('should create basic limit clause', () => {
    let limit = new LimitClause(100);
    expect(limit.toString()).toEqual('$limit=100');
  });

  it('should throw on zero limit', () => {
    let createFunc = function () { new LimitClause(0) };
    expect(createFunc).toThrow();
  });

  it('should throw on negative limit', () => {
    let createFunc = function () { new LimitClause(-100) };
    expect(createFunc).toThrow();
  });

  it('should throw on decimal limit', () => {
    let createFunc = function () { new LimitClause(1.5) };
    expect(createFunc).toThrow();
  });
});
