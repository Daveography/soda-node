import { Point } from "geojson";
import { ISodaClient, AxiosSodaClient, SodaContext, SodaDataset, SodaHost, SodaResource } from "./client";
import { Coordinate, FloatingTimestamp, Location } from "./datatypes";

@SodaDataset("2ccn-pwtu")
class DevelopmentPermit {
  city_file_number!: string;
  permit_type!: string;
  permit_class?: string;
  permit_date!: FloatingTimestamp;
  status?: string;
  description_of_development?: string;
  address?: string;
  legal_description?: string;
  neighbourhood_id!: number;
  neighbourhood!: string;
  neighbourhood_classification?: string;
  ward!: string;
  zoning!: string;
  land_parcel_count?: number;
  latitude?: Coordinate;
  longitude?: Coordinate;
  location?: Location;
  geometry_point?: Point;
}

@SodaHost('https://data.edmonton.ca/')
class OdpContext extends SodaContext {
  public readonly developmentPermits = new SodaResource(DevelopmentPermit, this);
}

const context = new OdpContext();
context.developmentPermits
  .where(p => p.permit_type)
    .equals('Major Development Permit')
  .and(p => p.permit_date)
    .greaterThan(new FloatingTimestamp('01/01/2023 GMT'))
  .and(p => p.zoning)
    .not().equals('RF1')
  .orderBy(p => p.neighbourhood)
  .limit(10)
  .observable()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .subscribe(permits => permits.forEach(p => console.info(p.description_of_development)));
