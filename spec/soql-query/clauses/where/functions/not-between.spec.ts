import { FloatingTimestamp } from "../../../../../src/datatypes/floating-timestamp";
import { Column } from "../../../../../src/soql-query/clauses/column";
import { NotBetween } from "../../../../../src/soql-query/clauses/where/functions/not-between";
import { WhereValue } from "../../../../../src/soql-query/clauses/where/where-value";

describe("NotBetween Where Filter", () => {
  const from = new WhereValue(1);
  const to = new WhereValue(20);

  it("should throw on null column", () => {
    // @ts-ignore TS2345
    const createFunc = () => new NotBetween(null, from, to);
    expect(createFunc).toThrow();
  });

  it("should throw on null from value", () => {
    // @ts-ignore TS2345
    const createFunc = () => new NotBetween(new Column("col1"), null, to);
    expect(createFunc).toThrow();
  });

  it("should throw on null to value", () => {
    // @ts-ignore TS2345
    const createFunc = () => new NotBetween(new Column("col1"), from, null);
    expect(createFunc).toThrow();
  });

  it("should create not between where filter with numeric values", () => {
    const filterObj = new NotBetween(new Column("col1"), from, to);
    expect(filterObj.toString()).toEqual("col1 not between '1' and '20'");
  });

  it("should create not between where filter for floating timestamp values", () => {
    const filterObj = new NotBetween(
      new Column("col1"),
      new WhereValue(new FloatingTimestamp("01/15/1999")),
      new WhereValue(new FloatingTimestamp("09/05/2012"))
    );
    expect(filterObj.toString()).toEqual(
      "col1 not between '1999-01-15T00:00:00.000' and '2012-09-05T00:00:00.000'"
    );
  });
});
