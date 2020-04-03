import { Column } from "../../../../src/soql/clauses/column";
import { Comparitor } from "../../../../src/soql/clauses/where/comparitor";
import { Operator } from "../../../../src/soql/clauses/where/operator";
import { WhereFilter } from "../../../../src/soql/clauses/where/where-filter";
import { WhereGroup } from "../../../../src/soql/clauses/where/where-group";
import { WhereOperator } from "../../../../src/soql/clauses/where/where-operator";
import { WhereStringValue } from "../../../../src/soql/clauses/where/where-string-value";

describe("Where Groups", () => {

  it("should create empty where group", () => {
    const groupObj = new WhereGroup();
    expect(groupObj.toString()).toEqual("");
  });

  it("should create where group with constructor values", () => {
    const groupObj = new WhereGroup(
      new WhereOperator(Operator.Not),
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereStringValue("test"),
      ),
    );
    expect(decodeURIComponent(groupObj.toString()))
      .toEqual("(NOT col1 = 'test')");
  });

  it("should create where group with more constructor values", () => {
    const groupObj = new WhereGroup(
      new WhereOperator(Operator.Not),
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereStringValue("test"),
      ),
      new WhereOperator(Operator.And),
      new WhereFilter(
        new Column("col2"),
        Comparitor.Equals,
        new WhereStringValue("hello world"),
      ),
    );
    expect(decodeURIComponent(groupObj.toString()))
      .toEqual("(NOT col1 = 'test' AND col2 = 'hello world')");
  });

  it("should add a component to the where group", () => {
    const groupObj = new WhereGroup([new WhereOperator(Operator.Not)]);
    groupObj.add(new WhereFilter(
      new Column("col1"),
      Comparitor.Equals,
      new WhereStringValue("test"),
    ));
    expect(decodeURIComponent(groupObj.toString()))
      .toEqual("(NOT col1 = 'test')");
  });

  it("should add components to empty where group", () => {
    const groupObj = new WhereGroup();
    groupObj.add(
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereStringValue("test"),
      ),
      new WhereOperator(Operator.And),
      new WhereFilter(
        new Column("col2"),
        Comparitor.Equals,
        new WhereStringValue("hello world"),
      ),
      );
    expect(decodeURIComponent(groupObj.toString()))
      .toEqual("(col1 = 'test' AND col2 = 'hello world')");
  });

  it("should add nested group to group", () => {
    const groupObj = new WhereGroup();
    groupObj.add(
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereStringValue("test"),
      ),
      new WhereOperator(Operator.And),
      new WhereGroup(
        new WhereFilter(
          new Column("col2"),
          Comparitor.Equals,
          new WhereStringValue("hello world"),
        ),
        new WhereOperator(Operator.Or),
        new WhereFilter(
          new Column("col2"),
          Comparitor.Equals,
          new WhereStringValue("hello planet"),
        ),
      ),
    );
    expect(decodeURIComponent(groupObj.toString()))
      .toEqual("(col1 = 'test' AND (col2 = 'hello world' OR col2 = 'hello planet'))");
  });
});
