import { LimitClause, OffsetClause, SoqlQueryBuilder, WhereFilter, WhereClause, Column, Comparitor, WhereValue } from "../../src/soql-query-builder";

describe("SoqlQueryBuilder", () => {

  it("should create empty builder with no params", () => {
    const query = new SoqlQueryBuilder();

    expect(query.toString()).toEqual("");
  });

  it("should create builder with single clause", () => {
    const clause = new LimitClause(20);
    const query = new SoqlQueryBuilder(clause);

    expect(query.Clauses).toContain(clause);
    expect(query.toString()).toEqual("?$limit=20");
  });

  it("should create builder with multiple clauses", () => {
    const limitClause = new LimitClause(20);
    const offsetClause = new OffsetClause(20);
    const query = new SoqlQueryBuilder(limitClause, offsetClause);

    expect(query.Clauses).toContain(limitClause);
    expect(query.Clauses).toContain(offsetClause);
    expect(query.toString()).toEqual("?$limit=20&$offset=20");
  });

  it("should create builder with split where clause", () => {
    const limitClause = new LimitClause(20);
    const whereClause = new WhereClause(
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereValue("test"),
      ),
    );
    const query = new SoqlQueryBuilder(limitClause, whereClause);

    expect(query.Clauses).toContain(limitClause);
    expect(query.Clauses).not.toContain(whereClause);
    expect(query.WhereClause).toEqual(whereClause);
    expect(query.toString()).toEqual("?$limit=20&$where=col1 = 'test'");
  });
});
