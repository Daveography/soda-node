import { LimitClause, OffsetClause, SoqlQueryBuilder } from "../../src/soql-query-builder";

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
});