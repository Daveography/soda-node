import { OffsetClause } from "../../../src/soql/clauses/offset-clause";

describe('Offset Clause', () => {

  it('should create basic limit clause', () => {
    let limit = new OffsetClause(100);
    expect(limit.toString()).toEqual('$offset=100');
  });

  it('should allow zero limit', () => {
    let limit = new OffsetClause(0);
    expect(limit.toString()).toEqual('');
  });

  it('should throw on negative limit', () => {
    let createFunc = function () { new OffsetClause(-100) };
    expect(createFunc).toThrow();
  });

  it('should throw on decimal limit', () => {
    let createFunc = function () { new OffsetClause(1.5) };
    expect(createFunc).toThrow();
  });
});
