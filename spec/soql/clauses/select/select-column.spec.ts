import { SelectColumn } from "../../../../src/soql/clauses/select/select-column";

describe("Select Columns", () => {

  it("should create basic column", () => {
    const columnName = "my_column";
    const columnObj = new SelectColumn(columnName);
    expect(columnObj.toString()).toEqual(columnName);
  });

  it("should create basic column with alias", () => {
    const columnName = "my_column";
    const alias = "the_column";
    const columnObj = new SelectColumn(columnName, alias);
    expect(columnObj.toString()).toEqual(columnName + " AS " + alias);
  });

  it("should not allow empty column name", () => {
    const createFunc = () => new SelectColumn("");
    expect(createFunc).toThrow();
  });

  it("should not allow null column name", () => {
    const createFunc = () => new SelectColumn(null);
    expect(createFunc).toThrow();
  });

  it("should ignore null alias", () => {
    const columnName = "my_column";
    const alias = null;
    const columnObj = new SelectColumn(columnName, alias);
    expect(columnObj.toString()).toEqual(columnName);
  });

  it("should ignore empty alias", () => {
    const columnName = "my_column";
    const alias = "";
    const columnObj = new SelectColumn(columnName, alias);
    expect(columnObj.toString()).toEqual(columnName);
  });
});
