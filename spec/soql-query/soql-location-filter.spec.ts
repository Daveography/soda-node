import { createMock } from 'ts-auto-mock';
import { ISodaResource } from "../../src/client/isodaresource";
import { Location } from "../../src/datatypes/location";
import { SoqlQuery } from "../../src/soql-query/soql-query";
import { IQueryable } from '../../src/soql-query/iqueryable';

describe("SoqlLocationFilter", () => {
  interface ITestInterface {
    id: number;
    title: string;
    location: Location;
  }

  const mockResource: ISodaResource<ITestInterface> = createMock<ISodaResource<ITestInterface>>();
  const query: IQueryable<ITestInterface> = new SoqlQuery<ITestInterface>(mockResource);

  it("should generate simple function query", () => {
    const generatedQuery = query.location(x => x.location)
      .withinCircle(new Location(-31.518292, -71.099290), 5000)
      .toString();

    expect(generatedQuery.toString())
      .toEqual("?$where=within_circle(location, -31.518292, -71.099290, 5000)");
  });

});
