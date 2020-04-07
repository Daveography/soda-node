import { createMock } from 'ts-auto-mock';
import { ISodaResource } from "../../../src/client/soda-resource";
import { SoqlQuery } from "../../../src/soql-query/soql-query";

describe("Soql Query", () => {
  interface ITestInterface {
    id: number;
    title: string;
  }

  const mockResource: ISodaResource<ITestInterface> = createMock<ISodaResource<ITestInterface>>();

  it("should generate simple query with limit and offset", () => {
    const query = new SoqlQuery<ITestInterface>(mockResource)
      .limit(20)
      .offset(30);

    const generatedQuery = (query as SoqlQuery<ITestInterface>).toString();

    expect(generatedQuery.toString()).toEqual("?$limit=20&$offset=30");
  });

  it("should generate simple query with one selected column", () => {
    const query = new SoqlQuery<ITestInterface>(mockResource)
    .select(x => x.id);

    const generatedQuery = (query as SoqlQuery<ITestInterface>).toString();

    expect(generatedQuery.toString()).toEqual("?$select=id");
  });

  it("should generate simple query with chained selected columns", () => {
    const query = new SoqlQuery<ITestInterface>(mockResource)
    .select(x => x.id)
    .select(x => x.title);

    const generatedQuery = (query as SoqlQuery<ITestInterface>).toString();

    expect(generatedQuery.toString()).toEqual("?$select=id&$select=title");
  });

  it("should generate complex query with multiple clauses", () => {
    const query = new SoqlQuery<ITestInterface>(mockResource)
      .where(x => x.id).equals(1)
      .limit(10)
      .offset(20)
      .select(x => x.id)
      .select(x => x.title);

    const generatedQuery = (query as SoqlQuery<ITestInterface>).toString();

    expect(decodeURIComponent(generatedQuery.toString()))
      .toEqual("?$where=id = '1'&$limit=10&$offset=20&$select=id&$select=title");
  });
});
