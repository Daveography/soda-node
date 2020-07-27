import { createMock } from 'ts-auto-mock';
import { ISodaResource } from "../../../src/client/isodaresource";
import { Location } from "../../../src/datatypes/location";
import { FluentQuery } from "../../../src/fluent-query/fluent-query";
import { IQueryable } from '../../../src/fluent-query/iqueryable';

describe("SoqlLocationFilter", () => {
  interface ITestInterface {
    id: number;
    title: string;
    location: Location;
  }

  const mockResource: ISodaResource<ITestInterface> = createMock<ISodaResource<ITestInterface>>();
  const query: IQueryable<ITestInterface> = new FluentQuery<ITestInterface>(mockResource);

  it("should generate simple function query", () => {
    const generatedQuery = query.location(x => x.location)
      .withinCircle(new Location(-31.518292, -71.099290), 5000)
      .toString();

    expect(generatedQuery.toString())
      .toEqual("?$where=within_circle(location, -31.518292, -71.099290, 5000)");
  });

});
