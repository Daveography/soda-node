import { WhereFilter } from "../../../../src/soql/clauses/where/where-filter";
import { Column } from "../../../../src/soql/clauses/column";
import { Comparitor } from "../../../../src/soql/clauses/where/comparitor";
import { WhereStringValue } from "../../../../src/soql/clauses/where/where-string-value";

describe('Where Filters', () => {

  it('should create equals where filter', () => {
    let filterObj = new WhereFilter(
      new Column('col1'),
      Comparitor.Equals,
      new WhereStringValue('test')
      );
    expect(filterObj.toString()).toEqual("col1 = 'test'");
  });

  it('should create greater than where filter', () => {
    let filterObj = new WhereFilter(
      new Column('col1'),
      Comparitor.GreaterThan,
      new WhereStringValue('3.0')
    );
    expect(filterObj.toString()).toEqual("col1 > '3.0'");
  });

  it('should create less than where filter', () => {
    let filterObj = new WhereFilter(
      new Column('col1'),
      Comparitor.LessThan,
      new WhereStringValue('3.0')
    );
    expect(filterObj.toString()).toEqual("col1 < '3.0'");
  });

  it('should create is null where filter', () => {
    let filterObj = new WhereFilter(
      new Column('col1'),
      Comparitor.IsNull
    );
    expect(filterObj.toString()).toEqual('col1 IS NULL');
  });

  it('should create is not null where filter', () => {
    let filterObj = new WhereFilter(
      new Column('col1'),
      Comparitor.IsNotNull
    );
    expect(filterObj.toString()).toEqual('col1 IS NOT NULL');
  });

  it('should not accept a value if testing is null', () => {
    let createFunc = function () {
      new WhereFilter(
        new Column('col1'),
        Comparitor.IsNull,
        new WhereStringValue('test')
      )
    }
    expect(createFunc).toThrow();
  });

  it('should not accept a value if testing is not null', () => {
    let createFunc = function () {
      new WhereFilter(
        new Column('col1'),
        Comparitor.IsNotNull,
        new WhereStringValue('test')
      )}
    expect(createFunc).toThrow();
  });
  
});
