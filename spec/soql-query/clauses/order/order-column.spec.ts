import { OrderColumn } from "../../../../src/soql-query/clauses/order/order-column";

describe("OrderColumn", () => {
  it("should create basic column", () => {
    const columnName = "my_column";
    const columnObj = new OrderColumn(columnName);
    expect(columnObj.toString()).toEqual(columnName);
  });

  it("should create basic column with descending", () => {
    const columnName = "my_column";
    const columnObj = new OrderColumn(columnName, true);
    expect(columnObj.toString()).toEqual(columnName + " DESC");
  });

  it("should not allow empty column name", () => {
    const createFunc = () => new OrderColumn("");
    expect(createFunc).toThrow();
  });

  it("should not allow null column name", () => {
    // @ts-ignore TS2345
    const createFunc = () => new OrderColumn(null);
    expect(createFunc).toThrow();
  });

  it("should ignore false descending", () => {
    const columnName = "my_column";
    const columnObj = new OrderColumn(columnName, false);
    expect(columnObj.toString()).toEqual(columnName);
  });
});
