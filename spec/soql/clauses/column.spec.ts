import { Column } from "../../../src/soql/clauses/column";

describe('Column', () => {

  it('should create column with valid name', () => {
    let columnName = 'my_column1';
    let columnObj = new Column(columnName);
    expect(columnObj.toString()).toEqual(columnName);
  });

  it('should throw on invalid name', () => {
    let createFunc = function () { new Column('my&column') };
    expect(createFunc).toThrow();
  });

  it('should not allow empty name', () => {
    let createFunc = function () { new Column('') };
    expect(createFunc).toThrow();
  });

  it('should not allow null name', () => {
    let createFunc = function () { new Column(null) };
    expect(createFunc).toThrow();
  });
});
