import { SelectColumn } from "../../../../src/soql/clauses/select/select-column";

describe('Select Columns', () => {

  it('should create basic column', () => {
    let columnName = 'my_column';
    let columnObj = new SelectColumn(columnName);
    expect(columnObj.toString()).toEqual(columnName);
  });

  it('should create basic column with alias', () => {
    let columnName = 'my_column';
    let alias = 'the_column';
    let columnObj = new SelectColumn(columnName, alias);
    expect(columnObj.toString()).toEqual(columnName + ' AS ' + alias);
  });
  
  it('should not allow empty column name', () => {
    let createFunc = function () { new SelectColumn('') };
    expect(createFunc).toThrow();
  });

  it('should not allow null column name', () => {
    let createFunc = function () { new SelectColumn(null) };
    expect(createFunc).toThrow();
  });
  
  it('should ignore null alias', () => {
    let columnName = 'my_column';
    let alias = null;
    let columnObj = new SelectColumn(columnName, alias);
    expect(columnObj.toString()).toEqual(columnName);
  });

  it('should ignore empty alias', () => {
    let columnName = 'my_column';
    let alias = '';
    let columnObj = new SelectColumn(columnName, alias);
    expect(columnObj.toString()).toEqual(columnName);
  });
});
