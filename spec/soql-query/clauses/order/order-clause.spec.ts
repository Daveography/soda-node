import { OrderClause } from "../../../../src/soql-query/clauses/order/order-clause";
import { OrderColumn } from "../../../../src/soql-query/clauses/order/order-column";

describe("OrderClause", () => {

  it("should throw on create empty clause", () => {
    const createFunc = () => new OrderClause();
    expect(createFunc).toThrow();
  });

  it("should throw on create empty clause array", () => {
    const createFunc = () => new OrderClause(...new Array<OrderColumn>());
    expect(createFunc).toThrow();
  });

  it("should create simple clause from constructor", () => {
    const columnName = "my_column";
    const clauseObj = new OrderClause(new OrderColumn(columnName));
    expect(clauseObj.toString()).toEqual("$order=" + columnName);
  });

  it("should create simple descending clause from constructor", () => {
    const columnName = "my_column";
    const clauseObj = new OrderClause(new OrderColumn(columnName, true));
    expect(clauseObj.toString()).toEqual("$order=" + columnName + " DESC");
  });

  it("should create multicolumn clause from constructor", () => {
    const columnName1 = "my_column";
    const columnName2 = "column2";
    const clauseObj = new OrderClause(
      new OrderColumn(columnName1),
      new OrderColumn(columnName2),
    );
    expect(clauseObj.toString()).toEqual("$order=" + columnName1 + "," + columnName2);
  });

  it("should create multicolumn clause including one descending from constructor", () => {
    const columnName1 = "my_column";
    const columnName2 = "column2";
    const clauseObj = new OrderClause(
      new OrderColumn(columnName1),
      new OrderColumn(columnName2, true),
    );
    expect(clauseObj.toString()).toEqual("$order=" + columnName1 + "," + columnName2 + " DESC");
  });

  it("should throw on attempting to alter columns", () => {
    const columnName1 = "my_column";
    const columnName2 = "column2";
    const clauseObj = new OrderClause(new OrderColumn(columnName1));

    const pushFunc = () => clauseObj.Columns.push(new OrderColumn(columnName2));
    
    expect(pushFunc).toThrow();
  });
});
