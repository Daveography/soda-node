import { WhereStringValue } from "../../../../src/soql/clauses/where/where-string-value";

describe('Where Values', () => {

  it('should create where value and return quoted value', () => {
    let value = 'any string';
    let valueObj = new WhereStringValue(value);
    expect(valueObj.toString()).toEqual("'any string'");
  });

  it('should not allow empty value', () => {
    let createFunc = function () { new WhereStringValue('') };
    expect(createFunc).toThrow();
  });

  it('should not allow null value', () => {
    let createFunc = function () { new WhereStringValue(null) };
    expect(createFunc).toThrow();
  });
});
