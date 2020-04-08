import { Column } from "../../../../src/soql-query-builder/clauses/column";
import { Comparitor } from "../../../../src/soql-query-builder/clauses/where/comparitor";
import { Operator } from "../../../../src/soql-query-builder/clauses/where/operator";
import { WhereClause } from "../../../../src/soql-query-builder/clauses/where/where-clause";
import { WhereFilter } from "../../../../src/soql-query-builder/clauses/where/where-filter";
import { WhereGroup } from "../../../../src/soql-query-builder/clauses/where/where-group";
import { WhereOperator } from "../../../../src/soql-query-builder/clauses/where/where-operator";
import { WhereValue } from "../../../../src/soql-query-builder/clauses/where/where-value";

describe("Where Clauses", () => {

  it("should create empty where clause", () => {
    const groupObj = new WhereClause();
    expect(groupObj.toString()).toEqual("");
  });

  it("should create where clause with constructor values", () => {
    const groupObj = new WhereClause(
      new WhereOperator(Operator.Not),
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereValue("test"),
      ),
    );
    expect(groupObj.toString())
      .toEqual("$where=NOT col1 = 'test'");
  });

  it("should create where clause with more constructor values", () => {
    const groupObj = new WhereClause(
      new WhereOperator(Operator.Not),
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereValue("test"),
      ),
      new WhereOperator(Operator.And),
      new WhereFilter(
        new Column("col2"),
        Comparitor.Equals,
        new WhereValue("hello world"),
      ),
    );
    expect(groupObj.toString())
      .toEqual("$where=NOT col1 = 'test' AND col2 = 'hello world'");
  });

  it("should add a component to the where clause", () => {
    const groupObj = new WhereClause([new WhereOperator(Operator.Not)]);
    groupObj.add(new WhereFilter(
      new Column("col1"),
      Comparitor.Equals,
      new WhereValue("test"),
    ));
    expect(groupObj.toString())
      .toEqual("$where=NOT col1 = 'test'");
  });

  it("should add components to empty where clause", () => {
    const groupObj = new WhereClause();
    groupObj.add(
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereValue("test"),
      ),
      new WhereOperator(Operator.And),
      new WhereFilter(
        new Column("col2"),
        Comparitor.Equals,
        new WhereValue("hello world"),
      ),
    );
    expect(groupObj.toString())
      .toEqual("$where=col1 = 'test' AND col2 = 'hello world'");
  });

  it("should add group to clause", () => {
    const groupObj = new WhereClause();
    groupObj.add(
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereValue("test"),
      ),
      new WhereOperator(Operator.And),
      new WhereGroup(
        new WhereFilter(
          new Column("col2"),
          Comparitor.Equals,
          new WhereValue("hello world"),
        ),
        new WhereOperator(Operator.Or),
        new WhereFilter(
          new Column("col2"),
          Comparitor.Equals,
          new WhereValue("hello planet"),
        ),
      ),
    );
    expect(groupObj.toString())
      .toEqual("$where=col1 = 'test' AND (col2 = 'hello world' OR col2 = 'hello planet')");
  });

  it("should add nested group to clause", () => {
    const groupObj = new WhereClause(
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereValue("test"),
      ),
      new WhereOperator(Operator.And),
      new WhereGroup(
        new WhereFilter(
          new Column("col2"),
          Comparitor.Equals,
          new WhereValue("hello world"),
        ),
        new WhereOperator(Operator.Or),
        new WhereGroup(new WhereFilter(
          new Column("col3"),
          Comparitor.Equals,
          new WhereValue("test1"),
        ),
          new WhereOperator(Operator.Or),
          new WhereFilter(
            new Column("col3"),
            Comparitor.Equals,
            new WhereValue("test2"),
          ),
        ),
      ),
    );
    expect(groupObj.toString())
      .toEqual("$where=col1 = 'test' AND (col2 = 'hello world' OR (col3 = 'test1' OR col3 = 'test2'))");
  });
});
