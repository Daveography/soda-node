import { LimitClause, OffsetClause, SoqlQueryBuilder } from "../../src/soql-query-builder";
import { ImmutableSoqlQueryBuilder } from "../../src/soql-query-builder/immutable-soql-query-builder";

describe("ImmutableSoqlQueryBuilder", () => {

  it("should create empty builder with no params", () => {
    const iQuery = new ImmutableSoqlQueryBuilder();

    expect(iQuery.toString()).toEqual("");
  });

  it("should create builder with existing builder", () => {
    const clause = new LimitClause(20);
    const query = new SoqlQueryBuilder(clause);
    const iQuery = new ImmutableSoqlQueryBuilder(query);

    expect(iQuery.toString()).toEqual("?$limit=20");
  });

  it("should return new builder when adding clauses", () => {
    const clause = new LimitClause(20);
    const query = new SoqlQueryBuilder(clause);
    const iQuery = new ImmutableSoqlQueryBuilder(query);

    const offsetClause = new OffsetClause(20);
    const newiQuery = iQuery.addClause(offsetClause);

    expect(newiQuery).not.toBe(iQuery)
    expect(iQuery.toString()).toEqual("?$limit=20");
    expect(newiQuery.toString()).toEqual("?$limit=20&$offset=20");
  });
});