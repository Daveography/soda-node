import { Operator } from "../../../../src/soql-query/clauses/where/operator";
import { WhereOperator } from "../../../../src/soql-query/clauses/where/where-operator";

describe("Where Operators", () => {
  it("should create AND where operator", () => {
    const valueObj = new WhereOperator(Operator.And);
    expect(valueObj.toString()).toEqual("AND");
  });

  it("should create OR where operator", () => {
    const valueObj = new WhereOperator(Operator.Or);
    expect(valueObj.toString()).toEqual("OR");
  });

  it("should create NOT where operator", () => {
    const valueObj = new WhereOperator(Operator.Not);
    expect(valueObj.toString()).toEqual("NOT");
  });

  it("should not allow null value", () => {
    // @ts-ignore TS2345
    const createFunc = () => new WhereOperator(null);
    expect(createFunc).toThrow();
  });
});
