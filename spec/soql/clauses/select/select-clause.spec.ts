import { SelectClause } from "../../../../src/soql/clauses/select/select-clause";
import { SelectColumn } from "../../../../src/soql/clauses/select/select-column";

describe("Select Clause", () => {

  it("should create empty clause", () => {
    const clauseObj = new SelectClause();
    expect(clauseObj.toString()).toEqual("");
  });

  it("should create simple clause from constructor", () => {
    const columnName = "my_column";
    const clauseObj = new SelectClause(new SelectColumn(columnName));
    expect(clauseObj.toString()).toEqual("$select=" + columnName);
  });

  it("should create multicolumn clause from constructor", () => {
    const columnName1 = "my_column";
    const columnName2 = "column2";
    const clauseObj = new SelectClause(
      new SelectColumn(columnName1),
      new SelectColumn(columnName2),
    );
    expect(clauseObj.toString()).toEqual("$select=" + columnName1 + "," + columnName2);
  });

  it("should add a column to clause", () => {
    const columnName1 = "my_column";
    const columnName2 = "column2";
    const clauseObj = new SelectClause(new SelectColumn(columnName1));
    clauseObj.add(new SelectColumn(columnName2));
    expect(clauseObj.toString()).toEqual("$select=" + columnName1 + "," + columnName2);
  });

  it("should create clause with alias from constructor", () => {
    const columnName = "my_column";
    const alias = "the_column";
    const clauseObj = new SelectClause(new SelectColumn(columnName, alias));
    expect(clauseObj.toString()).toEqual("$select=" + columnName + " AS " + alias);
  });

  it("should add a column with alias to clause", () => {
    const columnName1 = "my_column";
    const columnName2 = "column2";
    const alias = "the_column";
    const clauseObj = new SelectClause(new SelectColumn(columnName1));
    clauseObj.add(new SelectColumn(columnName2, alias));
    expect(clauseObj.toString()).toEqual("$select=" + columnName1 + "," + columnName2 + " AS " + alias);
  });
});
