import { InternalSoqlQueryBuilder } from "../../../src/soql/query-builder/internal-soql-query-builder";

describe("Soql Query Builder", () => {

  it("should generate simple query with limit and offset", () => {
    interface ITestInterface {
      id: number;
      title: string;
    }

    const query = new InternalSoqlQueryBuilder<ITestInterface>()
      .limit(20)
      .offset(30);

    const generatedQuery = (query as InternalSoqlQueryBuilder<ITestInterface>).getSoqlQuery();

    expect(generatedQuery.toString()).toEqual("?$limit=20&$offset=30");
  });

  it("should generate simple query with one selected column", () => {
    interface ITestInterface {
      id: number;
      title: string;
    }

    const query = new InternalSoqlQueryBuilder<ITestInterface>()
    .select(x => x.id);

    const generatedQuery = (query as InternalSoqlQueryBuilder<ITestInterface>).getSoqlQuery();

    expect(generatedQuery.toString()).toEqual("?$select=id");
  });

  it("should generate simple query with chained selected columns", () => {
    interface ITestInterface {
      id: number;
      title: string;
    }

    const query = new InternalSoqlQueryBuilder<ITestInterface>()
    .select(x => x.id)
    .select(x => x.title);

    const generatedQuery = (query as InternalSoqlQueryBuilder<ITestInterface>).getSoqlQuery();

    expect(generatedQuery.toString()).toEqual("?$select=id&$select=title");
  });

  it("should generate complex query with multiple clauses", () => {
    interface ITestInterface {
      id: number;
      title: string;
    }

    const query = new InternalSoqlQueryBuilder<ITestInterface>()
      .where(x => x.id).equals("001")
      .limit(10)
      .offset(20)
      .select(x => x.id)
      .select(x => x.title);

    const generatedQuery = (query as InternalSoqlQueryBuilder<ITestInterface>).getSoqlQuery();

    expect(decodeURIComponent(generatedQuery.toString()))
      .toEqual("?$limit=10&$offset=20&$select=id&$select=title&$where=id = '001'");
  });
});
