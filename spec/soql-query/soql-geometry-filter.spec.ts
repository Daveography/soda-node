import { Polygon } from 'geojson';
import { createMock } from 'ts-auto-mock';
import { ISodaResource } from "../../src/client";
import { IQueryable } from '../../src/soql-query/iqueryable';
import { SoqlQuery } from "../../src/soql-query/soql-query";
import { GeoJSONUtils } from '../../src/utilities/geojson-utils';

describe("SoqlGeometryFilter", () => {
  interface ITestInterface {
    id: number;
    title: string;
    geometry: Polygon;
  }

  const mockResource: ISodaResource<ITestInterface> = createMock<ISodaResource<ITestInterface>>();
  const query: IQueryable<ITestInterface> = new SoqlQuery<ITestInterface>(mockResource);

  it("should generate simple function query", () => {
    const point = GeoJSONUtils.point(-71.099290, -31.518292);

    const generatedQuery = query.whereGeometry(x => x.geometry)
      .intersects(point)
      .toString();

    expect(generatedQuery.toString())
      .toEqual("?$where=intersects(geometry, 'POINT (-71.09929 -31.518292)')");
  });

});
