import {
  Column,
  LimitClause,
  OffsetClause,
  SelectClause,
  WhereFilter,
  Comparitor,
  WhereValue,
  WhereClause,
  OrderClause,
  OrderColumn,
  SoqlQueryBuilder,
} from "../../src/soql-query";

describe("SoqlQueryBuilder", () => {
  it("should set limit clause", () => {
    const builder = new SoqlQueryBuilder();
    builder.limit(20);

    const expected = new LimitClause(20);

    expect(builder.LimitClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);
  });

  it("should reset limit clause", () => {
    const builder = new SoqlQueryBuilder();
    builder.limit(20);

    const expected = new LimitClause(20);

    expect(builder.LimitClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);

    builder.limit(30);
    const nowExpected = new LimitClause(30);

    expect(builder.LimitClause).toEqual(nowExpected);
    expect(builder.getQuery().Clauses).not.toContain(expected);
    expect(builder.getQuery().Clauses).toContain(nowExpected);
  });

  it("should clear limit clause", () => {
    const builder = new SoqlQueryBuilder();
    builder.limit(20);

    const expected = new LimitClause(20);

    expect(builder.LimitClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);

    builder.clearLimit();
    expect(builder.LimitClause).toBeUndefined();
    expect(builder.getQuery().Clauses).not.toContain(expected);
  });

  it("should set offset clause", () => {
    const builder = new SoqlQueryBuilder();
    builder.offset(20);

    const expected = new OffsetClause(20);

    expect(builder.OffsetClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);
  });

  it("should reset offset clause", () => {
    const builder = new SoqlQueryBuilder();
    builder.offset(20);

    const expected = new OffsetClause(20);

    expect(builder.OffsetClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);

    builder.offset(30);
    const nowExpected = new OffsetClause(30);

    expect(builder.OffsetClause).toEqual(nowExpected);
    expect(builder.getQuery().Clauses).not.toContain(expected);
    expect(builder.getQuery().Clauses).toContain(nowExpected);
  });

  it("should clear offset clause", () => {
    const builder = new SoqlQueryBuilder();
    builder.offset(20);

    const expected = new OffsetClause(20);

    expect(builder.OffsetClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);

    builder.clearOffset();

    expect(builder.OffsetClause).toBeUndefined();
    expect(builder.getQuery().Clauses).not.toContain(expected);
  });

  it("should set select clause", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    builder.select(col1);

    const expected = new SelectClause(col1);

    expect(builder.SelectClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);
  });

  it("should set select clause with multiple columns", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    const col2 = new Column("col2");
    builder.select(col1, col2);

    const expected = new SelectClause(col1, col2);

    expect(builder.SelectClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);
  });

  it("should append to select clause", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    const col2 = new Column("col2");
    builder.select(col1);

    const expected = new SelectClause(col1);

    expect(builder.SelectClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);

    builder.select(col2);
    const nowExpected = new SelectClause(col1, col2);

    expect(builder.SelectClause).toEqual(nowExpected);
    expect(builder.getQuery().Clauses).not.toContain(expected);
    expect(builder.getQuery().Clauses).toContain(nowExpected);
  });

  it("should clear select clause", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    builder.select(col1);

    const expected = new SelectClause(col1);

    expect(builder.SelectClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);

    builder.clearSelect();

    expect(builder.SelectClause).toBeUndefined();
    expect(builder.getQuery().Clauses).not.toContain(expected);
  });

  it("should set where clause", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    const value = new WhereValue("test");
    const filter = new WhereFilter(col1, Comparitor.Equals, value);
    builder.filter(filter);

    const expected = new WhereClause(filter);

    expect(builder.WhereClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);
  });

  it("should set where clause with multiple filters", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    const col2 = new Column("col2");
    const value = new WhereValue("test");

    const filter1 = new WhereFilter(col1, Comparitor.Equals, value);
    const filter2 = new WhereFilter(col2, Comparitor.Equals, value);

    builder.filter(filter1, filter2);

    const expected = new WhereClause(filter1, filter2);

    expect(builder.WhereClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);
  });

  it("should append new filter to where clause", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    const col2 = new Column("col2");
    const value = new WhereValue("test");

    const filter1 = new WhereFilter(col1, Comparitor.Equals, value);
    const filter2 = new WhereFilter(col2, Comparitor.Equals, value);

    builder.filter(filter1);

    const expected = new WhereClause(filter1);

    expect(builder.WhereClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);

    builder.filter(filter2);

    const nowExpected = new WhereClause(filter1, filter2);

    expect(builder.WhereClause).toEqual(nowExpected);
    expect(builder.getQuery().Clauses).not.toContain(expected);
    expect(builder.getQuery().Clauses).toContain(nowExpected);
  });

  it("should clear where clause", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    const value = new WhereValue("test");
    const filter = new WhereFilter(col1, Comparitor.Equals, value);
    builder.filter(filter);

    const expected = new WhereClause(filter);

    expect(builder.WhereClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);

    builder.clearFilters();

    expect(builder.WhereClause).toBeUndefined();
    expect(builder.getQuery().Clauses).not.toContain(expected);
  });

  it("should set order clause", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    builder.orderBy(col1);

    const expected = new OrderClause(col1);

    expect(builder.OrderClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);
  });

  it("should set order clause with multiple columns", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    const col2 = new OrderColumn("col2", true);
    builder.orderBy(col1, col2);

    const expected = new OrderClause(col1, col2);

    expect(builder.OrderClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);
  });

  it("should append to order clause", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    const col2 = new OrderColumn("col2", true);
    builder.orderBy(col1);

    const expected = new OrderClause(col1);

    expect(builder.OrderClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);

    builder.orderBy(col2);
    const nowExpected = new OrderClause(col1, col2);

    expect(builder.OrderClause).toEqual(nowExpected);
    expect(builder.getQuery().Clauses).not.toContain(expected);
    expect(builder.getQuery().Clauses).toContain(nowExpected);
  });

  it("should clear order clause", () => {
    const builder = new SoqlQueryBuilder();
    const col1 = new Column("col1");
    builder.orderBy(col1);

    const expected = new OrderClause(col1);

    expect(builder.OrderClause).toEqual(expected);
    expect(builder.getQuery().Clauses).toContain(expected);

    builder.clearOrder();

    expect(builder.OrderClause).toBeUndefined();
    expect(builder.getQuery().Clauses).not.toContain(expected);
  });
});
