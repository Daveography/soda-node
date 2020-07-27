import { LimitClause, OffsetClause, SoqlQuery } from "../../src/soql-query";
import { SoqlQueryBuilder } from "../../src/soql-query/soql-query-builder";

describe("SoqlQueryBuilder", () => {

  it("should create empty builder with no params", () => {
    const iQuery = new SoqlQueryBuilder();

    expect(iQuery.toString()).toEqual("");
  });

  it("should create builder with existing builder", () => {
    const clause = new LimitClause(20);
    const query = new SoqlQuery(clause);
    const iQuery = new SoqlQueryBuilder(query);

    expect(iQuery.toString()).toEqual("?$limit=20");
  });

  it("should return new builder when adding clauses", () => {
    const clause = new LimitClause(20);
    const query = new SoqlQuery(clause);
    const iQuery = new SoqlQueryBuilder(query);

    const offsetClause = new OffsetClause(20);
    const newiQuery = iQuery.addClause(offsetClause);

    expect(newiQuery).not.toBe(iQuery)
    expect(iQuery.toString()).toEqual("?$limit=20");
    expect(newiQuery.toString()).toEqual("?$limit=20&$offset=20");
  });
});