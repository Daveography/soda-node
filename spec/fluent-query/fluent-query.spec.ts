import { Geometry } from 'geojson';
import { createMock } from 'ts-auto-mock';
import { ISodaResource } from "../../src/client/isodaresource";
import { Location } from '../../src/datatypes/location';
import { FluentQuery } from "../../src/fluent-query/fluent-query";
import { GeoJSONUtils } from '../../src/utilities/geojson-utils';

describe("FluentQuery", () => {
  interface ITestInterface {
    id: number;
    title: string;
    location: Location;
    geometry: Geometry;
  }

  const mockResource: ISodaResource<ITestInterface> = createMock<ISodaResource<ITestInterface>>();

  it("should generate simple query with limit and offset", () => {
    const query = new FluentQuery<ITestInterface>(mockResource)
      .limit(20)
      .offset(30);

    expect(query.toString()).toEqual("?$limit=20&$offset=30");
  });

  it("should generate simple query with one selected column", () => {
    const query = new FluentQuery<ITestInterface>(mockResource)
    .select(x => x.id);

    expect(query.toString()).toEqual("?$select=id");
  });

  it("should generate simple query with chained selected columns", () => {
    const query = new FluentQuery<ITestInterface>(mockResource)
    .select(x => x.id)
    .select(x => x.title);

    expect(query.toString()).toEqual("?$select=id,title");
  });

  it("should generate complex query with multiple clauses", () => {
    const query = new FluentQuery<ITestInterface>(mockResource)
      .where(x => x.id).equals(1)
      .limit(10)
      .offset(20)
      .select(x => x.id)
      .select(x => x.title);

    expect(query.toString())
      .toEqual("?$where=id = '1'&$select=id,title&$limit=10&$offset=20");
  });

  it("should combine mutliple where queries with and", () => {
    const query = new FluentQuery<ITestInterface>(mockResource)
      .where(x => x.id).equals(1)
      .and(x => x.title).equals("some text");

    expect(query.toString())
      .toEqual("?$where=id = '1' AND title = 'some text'");
  });

  it("should combine mutliple where queries with or", () => {
    const query = new FluentQuery<ITestInterface>(mockResource)
      .where(x => x.id).equals(1)
      .or(x => x.title).equals("some text");

    expect(query.toString())
      .toEqual("?$where=id = '1' OR title = 'some text'");
  });

  it("should generate simple not query", () => {
    const query = new FluentQuery<ITestInterface>(mockResource)
      .where(x => x.id).not().equals(1);

    expect(query.toString())
      .toEqual("?$where=NOT id = '1'");
  });

  it("should throw on double not", () => {
    const createFunc = () => new FluentQuery<ITestInterface>(mockResource)
      .where(x => x.id).not().not().equals(1);

    expect(createFunc).toThrow();
  });

  it("should generate complex query with and or and not", () => {
    const query = new FluentQuery<ITestInterface>(mockResource)
      .where(x => x.id).equals(1)
      .or(x => x.id).not().equals(0)
      .and(x => x.title).not().equals('test')
      .or(x => x.title).isNotNull();

    expect(query.toString())
      .toEqual("?$where=id = '1' OR NOT id = '0' AND NOT title = 'test' OR title IS NOT NULL");
  });
});
