import { FloatingTimestamp } from '../../../../../src/datatypes/floating-timestamp';
import { Column } from "../../../../../src/soql-query/clauses/column";
import { NotIn } from '../../../../../src/soql-query/clauses/where/functions/not-in';

describe("NotIn Where Filter", () => {
  const stringValues = ["RF1", "RF2", "RF3"];
  const numericValues = [123, 456, 789]
  const floatingTimestampValues = [
    new FloatingTimestamp("04/23/1982"),
    new FloatingTimestamp("01/15/1999"),
    new FloatingTimestamp("09/05/2012")
  ]

  it("should throw on null column", () => {
    const createFunc = () => new NotIn(
      null,
      stringValues
    );
    expect(createFunc).toThrow();
  });

  it("should throw on null values", () => {
    const createFunc = () => new NotIn(
      new Column("col1"),
      null
    );
    expect(createFunc).toThrow();
  });

  it("should throw on empty values", () => {
    const createFunc = () => new NotIn(
      new Column("col1"),
      []
    );
    expect(createFunc).toThrow();
  });

  it("should create in where filter for string values", () => {
    const filterObj = new NotIn(
      new Column("col1"),
      stringValues
    );
    expect(filterObj.toString())
      .toEqual("col1 not in ('RF1', 'RF2', 'RF3')");
  });

  it("should create in where filter for numeric values", () => {
    const filterObj = new NotIn(
      new Column("col1"),
      numericValues
    );
    expect(filterObj.toString())
      .toEqual("col1 not in ('123', '456', '789')");
  });

  it("should create in where filter for floating timestamp values", () => {
    const filterObj = new NotIn(
      new Column("col1"),
      floatingTimestampValues
    );
    expect(filterObj.toString())
      .toEqual("col1 not in ('1982-04-23T00:00:00.000', '1999-01-15T00:00:00.000', '2012-09-05T00:00:00.000')");
  });
});
