import { Column } from "../../../src/soql/clauses";
import { InternalSoqlQueryBuilder } from "../../../src/soql/query-builder/internal-soql-query-builder";
import { InternalWhereFilterBuilder } from "../../../src/soql/query-builder/internal-where-filter-builder";

describe("Where Filter Builder", () => {
  interface ITestInterface {
    id: number;
    title: string;
  }

  const column = Column.of<ITestInterface>(x => x.id);

  it("should throw if query is null", () => {
    const createFunc = () => new InternalWhereFilterBuilder<ITestInterface>(null, column);
    expect(createFunc).toThrow();
  });

  it("should throw if column is null", () => {
    const query = new InternalSoqlQueryBuilder<ITestInterface>();
    const createFunc = () => new InternalWhereFilterBuilder<ITestInterface>(query, null);
    expect(createFunc).toThrow();
  });

  it("should generate simple where equals query", () => {
    const query = new InternalSoqlQueryBuilder<ITestInterface>();
    const builder = new InternalWhereFilterBuilder<ITestInterface>(query, column);
    builder.equals("001");

    const clause = (builder as InternalWhereFilterBuilder<ITestInterface>).getWhereClause();

    expect(decodeURIComponent(clause.toString()))
      .toEqual("$where=id = '001'");
  });

  it("should throw if equals is null", () => {
    const query = new InternalSoqlQueryBuilder<ITestInterface>();
    const builder = new InternalWhereFilterBuilder<ITestInterface>(query, column);

    const equalsFunc = () => builder.equals(null);
    expect(equalsFunc).toThrow();
  });

  it("should generate simple where is not null query", () => {
    const query = new InternalSoqlQueryBuilder<ITestInterface>();
    const builder = new InternalWhereFilterBuilder<ITestInterface>(query, column);
    builder.isNotNull();

    const clause = (builder as InternalWhereFilterBuilder<ITestInterface>).getWhereClause();

    expect(decodeURIComponent(clause.toString()))
      .toEqual("$where=id IS NOT NULL");
  });

  it("should generate simple where is null query", () => {
    const query = new InternalSoqlQueryBuilder<ITestInterface>();
    const builder = new InternalWhereFilterBuilder<ITestInterface>(query, column);
    builder.isNull();

    const clause = (builder as InternalWhereFilterBuilder<ITestInterface>).getWhereClause();

    expect(decodeURIComponent(clause.toString()))
      .toEqual("$where=id IS NULL");
  });

});
