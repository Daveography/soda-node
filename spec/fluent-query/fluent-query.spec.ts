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

    expect(query.toString()).toEqual("?$select=id&$select=title");
  });

  it("should generate complex query with multiple clauses", () => {
    const query = new FluentQuery<ITestInterface>(mockResource)
      .where(x => x.id).equals(1)
      .limit(10)
      .offset(20)
      .select(x => x.id)
      .select(x => x.title);

    expect(query.toString())
      .toEqual("?$limit=10&$offset=20&$select=id&$select=title&$where=id = '1'");
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

  it("should combine mutliple location queries with or", () => {
    const query = new FluentQuery<ITestInterface>(mockResource)
      .location(x => x.location).withinCircle(new Location(53.540959, -113.493819), 2000)
      .location(x => x.location).withinCircle(new Location(53.540859, -113.493719), 2000);

    expect(query.toString())
      .toEqual("?$where=within_circle(location, 53.540959, -113.493819, 2000) OR within_circle(location, 53.540859, -113.493719, 2000)");
  });

  it("should combine mutliple geometry queries with or", () => {
    const query = new FluentQuery<ITestInterface>(mockResource)
      .geometry(x => x.geometry).withinCircle(GeoJSONUtils.point(53.540959, -113.493819), 2000)
      .geometry(x => x.geometry).withinCircle(GeoJSONUtils.point(53.540859, -113.493719), 2000);

    expect(query.toString())
      .toEqual("?$where=within_circle(location, 53.540959, -113.493819, 2000) OR within_circle(location, 53.540859, -113.493719, 2000)");
  });
});
