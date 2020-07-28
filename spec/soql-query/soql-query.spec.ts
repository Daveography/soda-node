import { Column, Comparitor, LimitClause, OffsetClause, SoqlQuery, WhereClause, WhereFilter, WhereValue } from "../../src/soql-query";

describe("SoqlQuery", () => {

  it("should create empty query with no params", () => {
    const query = new SoqlQuery();

    expect(query.toString()).toEqual("");
  });

  it("should create query with single clause", () => {
    const clause = new LimitClause(20);
    const query = new SoqlQuery(clause);

    expect(query.Clauses).toContain(clause);
    expect(query.toString()).toEqual("?$limit=20");
  });

  it("should create query with multiple clauses", () => {
    const limitClause = new LimitClause(20);
    const offsetClause = new OffsetClause(20);
    const whereClause = new WhereClause(
      new WhereFilter(
        new Column("col1"),
        Comparitor.Equals,
        new WhereValue("test"),
      ),
    );

    const query = new SoqlQuery(limitClause, offsetClause, whereClause);

    expect(query.Clauses).toContain(limitClause);
    expect(query.Clauses).toContain(offsetClause);
    expect(query.Clauses).toContain(whereClause);
    expect(query.toString()).toEqual("?$limit=20&$offset=20&$where=col1 = 'test'");
  });
});
