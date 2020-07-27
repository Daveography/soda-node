import { Location } from "../../../../src/datatypes/location";
import { Column } from "../../../../src/soql-query/clauses/column";
import { Comparitor } from "../../../../src/soql-query/clauses/where/comparitor";
import { WithinCircle } from "../../../../src/soql-query/clauses/where/functions/within-circle";
import { Operator } from "../../../../src/soql-query/clauses/where/operator";
import { WhereClause } from "../../../../src/soql-query/clauses/where/where-clause";
import { WhereFilter } from "../../../../src/soql-query/clauses/where/where-filter";
import { WhereGroup } from "../../../../src/soql-query/clauses/where/where-group";
import { WhereOperator } from "../../../../src/soql-query/clauses/where/where-operator";
import { WhereValue } from "../../../../src/soql-query/clauses/where/where-value";

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

  it("should create a function clause", () => {
    const groupObj = new WhereClause(
      new WithinCircle(
        new Column("col1"),
        new Location(53.528525, -113.501720),
        500,
        )
    );
    expect(groupObj.toString())
      .toEqual("$where=within_circle(col1, 53.528525, -113.501720, 500)");
  });

  it("should create a compound clause with function", () => {
    const groupObj = new WhereClause(
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereValue("test"),
      ),
      new WhereOperator(Operator.Or),
      new WithinCircle(
        new Column("col2"),
        new Location(57.981640, -3.944209),
        2000,
      ),
    );
    expect(groupObj.toString())
      .toEqual("$where=col1 = 'test' OR within_circle(col2, 57.981640, -3.944209, 2000)");
  });
});
