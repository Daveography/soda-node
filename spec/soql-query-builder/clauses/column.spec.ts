import { FloatingTimestamp } from "../../../src/datatypes/floating-timestamp";
import { Column } from "../../../src/soql-query-builder/clauses/column";

describe("Column", () => {

  it("should create column with valid name", () => {
    const columnName = "my_column1";
    const columnObj = new Column(columnName);
    expect(columnObj.toString()).toEqual(columnName);
  });

  it("should throw on invalid name", () => {
    const createFunc = () => new Column("my&column");
    expect(createFunc).toThrow();
  });

  it("should not allow empty name", () => {
    const createFunc = () => new Column("");
    expect(createFunc).toThrow();
  });

  it("should not allow null name", () => {
    const createFunc = () => new Column(null);
    expect(createFunc).toThrow();
  });

  it("should return a column for a type property", () => {
    interface ITestInterface {
      id: number;
      title: string;
      published: FloatingTimestamp;
    }

    let result = Column.of<ITestInterface>(x => x.id);
    expect(result.Name).toEqual("id");

    result = Column.of<ITestInterface>(x => x.title);
    expect(result.Name).toEqual("title");

    result = Column.of<ITestInterface>(x => x.published);
    expect(result.Name).toEqual("published");
  });
});
