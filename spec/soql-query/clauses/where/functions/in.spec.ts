import { FloatingTimestamp } from '../../../../../src/datatypes/floating-timestamp';
import { Column } from "../../../../../src/soql-query/clauses/column";
import { In } from '../../../../../src/soql-query/clauses/where/functions/in';
import { WhereValue } from '../../../../../src/soql-query/clauses/where/where-value';

describe("In Where Filter", () => {
  const stringValues = [
    new WhereValue("RF1"),
    new WhereValue("RF2"),
    new WhereValue("RF3")
  ];
  const numericValues = [
    new WhereValue(123),
    new WhereValue(456),
    new WhereValue(789)
  ];
  const floatingTimestampValues = [
    new WhereValue(new FloatingTimestamp("04/23/1982")),
    new WhereValue(new FloatingTimestamp("01/15/1999")),
    new WhereValue(new FloatingTimestamp("09/05/2012"))
  ];

  it("should throw on null column", () => {
    const createFunc = () => new In(
      null,
      stringValues
    );
    expect(createFunc).toThrow();
  });

  it("should throw on null values", () => {
    const createFunc = () => new In(
      new Column("col1"),
      null
    );
    expect(createFunc).toThrow();
  });

  it("should throw on empty values", () => {
    const createFunc = () => new In(
      new Column("col1"),
      []
    );
    expect(createFunc).toThrow();
  });

  it("should create in where filter for string values", () => {
    const filterObj = new In(
      new Column("col1"),
      stringValues
    );
    expect(filterObj.toString())
      .toEqual("col1 in ('RF1', 'RF2', 'RF3')");
  });

  it("should create in where filter for numeric values", () => {
    const filterObj = new In(
      new Column("col1"),
      numericValues
    );
    expect(filterObj.toString())
      .toEqual("col1 in ('123', '456', '789')");
  });

  it("should create in where filter for floating timestamp values", () => {
    const filterObj = new In(
      new Column("col1"),
      floatingTimestampValues
    );
    expect(filterObj.toString())
      .toEqual("col1 in ('1982-04-23T00:00:00.000', '1999-01-15T00:00:00.000', '2012-09-05T00:00:00.000')");
  });
});
