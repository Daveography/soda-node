import { Polygon } from 'geojson';
import { createMock } from 'ts-auto-mock';
import { ISodaResource } from "../../../src/client/isoda-resource";
import { FluentQuery } from "../../../src/fluent-query/fluent-query";
import { IQueryable } from '../../../src/fluent-query/iqueryable';
import { GeoJSONUtils } from '../../../src/utilities/geojson-utils';

describe("GeometryFilter", () => {
  interface ITestInterface {
    id: number;
    title: string;
    geometry: Polygon;
  }

  const mockResource: ISodaResource<ITestInterface> = createMock<ISodaResource<ITestInterface>>();
  const query: IQueryable<ITestInterface> = new FluentQuery<ITestInterface>(mockResource);

  it("should generate simple function query", () => {
    const point = GeoJSONUtils.point(-71.099290, -31.518292);

    const generatedQuery = query.geometry(x => x.geometry)
      .intersects(point)
      .toString();

    expect(generatedQuery.toString())
      .toEqual("?$where=intersects(geometry, 'POINT (-71.09929 -31.518292)')");
  });

});
