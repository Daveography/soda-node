import { Column, Comparitor, LimitClause, OffsetClause, SoqlQuery, WhereClause, WhereFilter, WhereValue } from "../../src/soql-query";

describe("SoqlQueryBuilder", () => {

  it("should create empty builder with no params", () => {
    const query = new SoqlQuery();

    expect(query.toString()).toEqual("");
  });

  it("should create builder with single clause", () => {
    const clause = new LimitClause(20);
    const query = new SoqlQuery(clause);

    expect(query.Clauses).toContain(clause);
    expect(query.toString()).toEqual("?$limit=20");
  });

  it("should create builder with multiple clauses", () => {
    const limitClause = new LimitClause(20);
    const offsetClause = new OffsetClause(20);
    const query = new SoqlQuery(limitClause, offsetClause);

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
    const query = new SoqlQuery(limitClause, whereClause);

    expect(query.Clauses).toContain(limitClause);
    expect(query.Clauses).not.toContain(whereClause);
    expect(query.WhereClause).toEqual(whereClause);
    expect(query.toString()).toEqual("?$limit=20&$where=col1 = 'test'");
  });
});
