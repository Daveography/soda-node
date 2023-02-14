# soda-node
Socrata SODA client for Node

## Installation

```bash
npm install soda-node --save
```

If your project is using TypeScript, you'll probably also want:
```bash
npm install @types/geojson --save-dev
```

## Basic Usage

1. Create models for your dataset(s), decorated with a `@SodaDataset` that provides the dataset id:

```js
import { MultiPolygon } from "geojson";
import { FloatingTimestamp, Location } from "soda-node";
import { SodaDataset } from "soda-node";

// https://data.edmonton.ca/Urban-Planning-Economy/Development-Permits/2ccn-pwtu
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
  zoning!: string;
  location?: Location;
}

// https://data.edmonton.ca/Geospatial-Boundaries/Building-Footprint/6n9r-ddf8
@SodaDataset("6n9r-ddf8")
export class BuildingFootprint {
  _170033_id!: number;
  the_geom!: MultiPolygon;
  area?: number;
}
```

2. Extend `SodaContext` with your own service context.
Provide the URL to the Socrata service of your choice via the `@SodaHost` decorator,
and create your `SodaResource` objects with the dataset models:

```js
import { SodaContext, SodaHost, SodaResource } from "soda-node";

@SodaHost("https://data.edmonton.ca/")
class EdmontonContext extends SodaContext {
  public readonly developmentPermits = new SodaResource(DevelopmentPermit, this);
  public readonly buildingFootprints = new SodaResource(BuildingFootprint, this);
}
```

3. Instantiate your Context and query against it using fluent querying:

```js
import { FloatingTimestamp, Location } from "soda-angular";

const context = new EdmontonContext();

context.developmentPermits
  .where(p => p.permit_type)
    .equals("Major Development Permit")
  .and(p => p.permit_date)
    .greaterThan(new FloatingTimestamp("04/23/2020 GMT"))
  .and(p => p.zoning)
    .not().equals("RF1")
  .orderBy(p => neighbourhood)
  .limit(10)
  .observable()
  .subscribe(permits => console.info(permits));
```

### Location type queries:

```js
context.developmentPermits
  .location(p => p.location)
    .withinCircle(new Location(53.540959, -113.493819), 2000);

context.developmentPermits
  .location(p => p.location)
    .withinBox(
      new Location(46.883198, -96.798216),
      new Location(46.873169, -96.785139)
    );
```

## Geometry type queries:

```js
import { MultiPolygon, Point } from "geojson";
import { GeoJSONUtils } from "soda-angular";

context.buildingFootprints
  .geometry(p => p.the_geom)
    .intersects(GeoJSONUtils.point(-71.099290, -31.518292));

context.buildingFootprints
  .geometry(p => p.the_geom)
    .intersects(GeoJSONUtils.polygon(
      [-113.599831726514, 53.458273089013],
      [-113.600049996812, 53.45827360864],
      [-113.600052949158, 53.457932503403],
      [-113.599845224387, 53.457931995732],
      [-113.599834691275, 53.457931970341],
      [-113.599831726514, 53.458273089013]
    ));

context.developmentPermits
  .geometry(p => p.location)
    .withinPolygon(GeoJSONUtils.multipolygon(
      [
        [-113.599831726514, 53.458273089013],
        [-113.600049996812, 53.45827360864],
        [-113.600052949158, 53.457932503403],
        [-113.599845224387, 53.457931995732],
        [-113.599834691275, 53.457931970341],
        [-113.599831726514, 53.458273089013]
      ]
    ));
```

## Query builders

You can also use query builders for more control (including OR queries):

```js
import { SoqlQueryBuilder } from "soda-angular";

const builder = new SoqlQueryBuilder();
  .filter(
    new WhereFilter(
      new Column("permit_type"),
      Comparitor.Equals,
      new WhereValue("Major Development Permit"),
    ),
    new WhereOperator(Operator.And),
    new WhereGroup(
      new WhereFilter(
        new Column("permit_value"),
        Comparitor.GreaterThan,
        new WhereValue(2000000),
      ),
      new WhereOperator(Operator.Or),
      new WhereGroup(
        new WhereFilter(
          new Column("permit_class"),
          Comparitor.Equals,
          new WhereValue("Class B"),
        )
      )
    )
  )
  .offset(20)
  .limit(20)
  .orderBy(new Column("neighbourhood"));

context.developmentPermits
  .get(builder)
  .subscribe(permits => console.info(permits));
```

## Notes
* This is a work in progress, watch this repository for updates
* Heavily inspired by Entity Framework
* See [soda-angular](https://github.com/Daveography/soda-angular/) for an Angular-specific implementation

## Roadmap
* Filter grouping
* Case-insensitive text matching
* Select-based functions

## Additional Reading

* [Socrata Developers](https://dev.socrata.com/)

## License

See [LICENSE](https://github.com/Daveography/soda-node/blob/master/LICENSE).