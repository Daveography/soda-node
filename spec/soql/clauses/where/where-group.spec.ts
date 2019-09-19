import { WhereGroup } from "../../../../src/soql/clauses/where/where-group";
import { WhereOperator } from "../../../../src/soql/clauses/where/where-operator";
import { Operator } from "../../../../src/soql/clauses/where/operator";
import { Comparitor } from "../../../../src/soql/clauses/where/comparitor";
import { WhereStringValue } from "../../../../src/soql/clauses/where/where-string-value";
import { Column } from "../../../../src/soql/clauses/column";
import { WhereFilter } from "../../../../src/soql/clauses/where/where-filter";

describe('Where Groups', () => {

  it('should create empty where group', () => {
    let groupObj = new WhereGroup();
    expect(groupObj.toString()).toEqual('');
  });

  it('should create where group with constructor values', () => {
    let groupObj = new WhereGroup(
      new WhereOperator(Operator.Not),
      new WhereFilter(
        new Column('col1'),
        Comparitor.Equals,
        new WhereStringValue('test')
      )
    );
    expect(groupObj.toString()).toEqual("(NOT col1 = 'test')");
  });

  it('should create where group with more constructor values', () => {
    let groupObj = new WhereGroup(
      new WhereOperator(Operator.Not),
      new WhereFilter(
        new Column('col1'),
        Comparitor.Equals,
        new WhereStringValue('test')
      ),
      new WhereOperator(Operator.And),
      new WhereFilter(
        new Column('col2'),
        Comparitor.Equals,
        new WhereStringValue('hello world')
      )
    );
    expect(groupObj.toString()).toEqual("(NOT col1 = 'test' AND col2 = 'hello world')");
  });

  it('should add a component to the where group', () => {
    let groupObj = new WhereGroup([new WhereOperator(Operator.Not)]);
    groupObj.add(new WhereFilter(
      new Column('col1'),
      Comparitor.Equals,
      new WhereStringValue('test')
    ));
    expect(groupObj.toString()).toEqual("(NOT col1 = 'test')");
  });

  it('should add components to empty where group', () => {
    let groupObj = new WhereGroup();
    groupObj.add(
      new WhereFilter(
        new Column('col1'),
        Comparitor.Equals,
        new WhereStringValue('test')
      ),
      new WhereOperator(Operator.And),
      new WhereFilter(
        new Column('col2'),
        Comparitor.Equals,
        new WhereStringValue('hello world')
      )
      );
    expect(groupObj.toString()).toEqual("(col1 = 'test' AND col2 = 'hello world')");
  });

  it('should add nested group to group', () => {
    let groupObj = new WhereGroup();
    groupObj.add(
      new WhereFilter(
        new Column('col1'),
        Comparitor.Equals,
        new WhereStringValue('test')
      ),
      new WhereOperator(Operator.And),
      new WhereGroup(
        new WhereFilter(
          new Column('col2'),
          Comparitor.Equals,
          new WhereStringValue('hello world')
        ),
        new WhereOperator(Operator.Or),
        new WhereFilter(
          new Column('col2'),
          Comparitor.Equals,
          new WhereStringValue('hello planet')
        )
      )
    );
    expect(groupObj.toString()).toEqual("(col1 = 'test' AND (col2 = 'hello world' OR col2 = 'hello planet'))");
  });
});
