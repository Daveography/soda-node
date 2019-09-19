import { WhereOperator } from "../../../../src/soql/clauses/where/where-operator";
import { Operator } from "../../../../src/soql/clauses/where/operator";

describe('Where Operators', () => {

  it('should create AND where operator', () => {
    let valueObj = new WhereOperator(Operator.And);
    expect(valueObj.toString()).toEqual('AND');
  });

  it('should create OR where operator', () => {
    let valueObj = new WhereOperator(Operator.Or);
    expect(valueObj.toString()).toEqual('OR');
  });

  it('should create NOT where operator', () => {
    let valueObj = new WhereOperator(Operator.Not);
    expect(valueObj.toString()).toEqual('NOT');
  });

  it('should not allow null value', () => {
    let createFunc = function () { new WhereOperator(null) };
    expect(createFunc).toThrow();
  });
});
