# soda-angular
Socrata SODA client for Angular

## Installation

```bash
npm install soda-angular --save
```

Also install these dev dependencies:
```bash
npm install geojson @types/geojson --save-dev
```

## Usage

1. Add the `SodaClientModule` to your module imports:

```js
import { SodaClientModule } from 'soda-angular';

...

@NgModule({
  ...
  imports: [
    ...
    SodaClientModule.forRoot()
  ]
})
export class AppModule { }
```

2. Create models for your dataset(s), decoated with a `@SodaDataset` that provides the dataset id:

```js
import { FloatingTimestamp, Location } from 'soda-angular';
import { SodaDataset } from 'soda-angular';

@SodaDataset('8b78-2kux')
export class DevelopmentPermit {
  city_file_number: string;
  permit_type: string;
  permit_class: string;
  permit_date: FloatingTimestamp;
  status: string;
  description_of_development: string;
  address: string;
  legal_description: string;
  neighbourhood_id: number;
  neighbourhood: string;
  zoning: string;
  location: Location;
}

@SodaDataset('rwuh-apwg')
export class BuildingPermit {
  row_id: string;
  permit_number: string;
  permit_date: FloatingTimestamp;
  address: string;
  legal_description: string;
  neighbourhood: string;
  job_description: string;
  building_type: string;
  construction_value: number;
  zoning: string;
  location: Location;
}

@SodaDataset('kk4c-7pcv')
export class LegalParcel {
  id: number;
  latitude: number;
  longitude: number;
  area: number;
  geometry: MultiPolygon;
}
```

3. Extend `SodaContext` with your own service context.
Provide the URL to the Socrata service of your choice via the `@SodaHost` decorator,
and create your `SodaResource` objects with a dataset models:

```js
import { Injectable } from '@angular/core';
import { SodaClient, SodaContext, SodaHost, SodaResource } from 'soda-angular';

@Injectable({
  providedIn: 'root',
})
@SodaHost('https://data.edmonton.ca/')
export class OdpContext extends SodaContext {
  public readonly developmentPermits: SodaResource<DevelopmentPermit>;
  public readonly buildingPermits: SodaResource<BuildingPermit>;

  constructor(sodaClient: SodaClient) {
    super(sodaClient);
    
    this.developmentPermits = new SodaResource(DevelopmentPermit, this);
    this.buildingPermits = new SodaResource(BuildingPermit, this);
  }
}
```

4. Inject your Context into your component, and query against it using fluent querying:

```js
import { Component, OnInit } from '@angular/core';
import { FloatingTimestamp, Location } from 'soda-angular';

@Component({
  selector: 'permits',
  templateUrl: './permits.component.html',
  styleUrls: ['./permits.component.css']
})
export class PermitsComponent implements OnInit {
  public DevelopmentPermits: DevelopmentPermit[];
  public BuildingPermits: BuildingPermit[];

  constructor(private context: OdpContext) { }

  ngOnInit() {
    this.context.developmentPermits
      .where(p => p.permit_type)
        .equals('Major Development Permit')
      .and(p => p.permit_date)
        .greaterThan(new FloatingTimestamp('04/23/2020 GMT'))
      .and(p => p.zoning)
        .not().equals('RF1')
      .orderBy(p => neighbourhood)
      .observable()
      .subscribe(permits => this.DevelopmentPermits = permits);

    this.context.buildingPermits
      .where(p => p.permit_date)
        .greaterThan(new FloatingTimestamp('04/23/2020 GMT'))
      .and(p => p.neighbourhood)
        .equals('DOWNTOWN')
      .or(p => p.neighbourhood)
        .equals('OLIVER')
      .observable()
      .subscribe(permits => this.BuildingPermits = permits);
  }
}
```

### Location type queries:

```js
this.context.developmentPermits
  .location(p => p.location)
    .withinCircle(new Location(53.540959, -113.493819), 2000));

this.context.buildingPermits
  .location(p => p.location)
    .withinBox(
      new Location(46.883198, -96.798216),
      new Location(46.873169, -96.785139)
    ));
```

### Geometry type queries:

```js
import { MultiPolygon, Point } from 'geojson';
import { GeoJSONUtils } from 'soda-angular';

this.context.legalParcels
  .geomery(p => p.geometry)
    .intersects(GeoJSONUtils.point(-71.099290, -31.518292));

this.context.legalParcels
  .geomery(p => p.geometry)
    .intersects(GeoJSONUtils.polygon(
      [
        -113.599831726514,
        53.458273089013
      ],
      [
        -113.600049996812,
        53.45827360864
      ],
      [
        -113.600052949158,
        53.457932503403
      ],
      [
        -113.599845224387,
        53.457931995732
      ],
      [
        -113.599834691275,
        53.457931970341
      ],
      [
        -113.599831726514,
        53.458273089013
      ]
    ));

this.context.legalParcels
  .geomery(p => p.latlon)
    .withinPolygon(GeoJSONUtils.multipolygon(
      [
        [
          -113.599831726514,
          53.458273089013
        ],
        [
          -113.600049996812,
          53.45827360864
        ],
        [
          -113.600052949158,
          53.457932503403
        ],
        [
          -113.599845224387,
          53.457931995732
        ],
        [
          -113.599834691275,
          53.457931970341
        ],
        [
          -113.599831726514,
          53.458273089013
        ]
      ]
    ));
```

### Query builders

You can also use query builders for more control (including OR queries):

```js
const builder = new SoqlQueryBuilder();
  .filter(
    new WhereFilter(
      new Column('permit_type'),
      Comparitor.Equals,
      new WhereValue('Major Development Permit'),
    ),
    new WhereOperator(Operator.And),
    new WhereGroup(
      new WhereFilter(
        new Column('permit_value'),
        Comparitor.GreaterThan,
        new WhereValue(2000000),
      ),
      new WhereOperator(Operator.Or),
      new WhereGroup(
        new WhereFilter(
          new Column('permit_class'),
          Comparitor.Equals,
          new WhereValue('Class B'),
        )
      )
    )
  )
  .offset(20)
  .limit(20)
  .orderBy(new Column('neighbourhood'));

this.context.developmentPermits
  .get(builder.getQuery())
  .subscribe(permits => this.Permits = permits);
```

## Notes
* This is a work in progress, watch this repository for updates.
* Heavily inspired by Entity Framework.
* Filter grouping coming soon.
* Support for select-based functions are coming.

## Additional Reading

* [Socrata Developers](https://dev.socrata.com/)
* [yeg-dev-dashboard](https://github.com/Daveography/yeg-dev-dashboard) (Example project)

## License

See [LICENSE](https://github.com/Daveography/soda-angular/blob/master/LICENSE).