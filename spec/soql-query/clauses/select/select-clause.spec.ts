import { Column } from '../../../../src/soql-query/clauses/column';
import { SelectClause } from "../../../../src/soql-query/clauses/select/select-clause";
import { SelectColumn } from "../../../../src/soql-query/clauses/select/select-column";

describe("Select Clause", () => {

  it("should throw on create empty clause", () => {
    const createFunc = () => new SelectClause();
    expect(createFunc).toThrow();
  });

  it("should throw on create empty clause array", () => {
    const createFunc = () => new SelectClause(...new Array<Column>());
    expect(createFunc).toThrow();
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

  it("should create clause with alias from constructor", () => {
    const columnName = "my_column";
    const alias = "the_column";
    const clauseObj = new SelectClause(new SelectColumn(columnName, alias));
    expect(clauseObj.toString()).toEqual("$select=" + columnName + " AS " + alias);
  });

  it("should throw on attempting to alter columns", () => {
    const columnName1 = "my_column";
    const columnName2 = "column2";
    const clauseObj = new SelectClause(new SelectColumn(columnName1));

    const pushFunc = () => clauseObj.Columns.push(new SelectColumn(columnName2));
    
    expect(pushFunc).toThrow();
  });
});
