# soda-angular
Socrata SODA client for Angular

## Installation

```bash
npm install soda-angular --save
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

2. Create models for your dataset(s):

```js
import { FloatingTimestamp } from 'soda-angular/datatypes';

export interface DevelopmentPermit {
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

export interface BuildingPermit {
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
```

3. Extend `SodaContext` with your own service context, providing the URL to the Socrata service of your choice,
and create your `SodaResource` objects with a dataset model to access specific datasets:

```js
@Injectable({
  providedIn: 'root',
})
export class OdpContext extends SodaContext {
  public readonly developmentPermits: SodaResource<DevelopmentPermit>;
  public readonly buildingPermits: SodaResource<BuildingPermit>;

  constructor(private sodaClient: SodaClient) {
    super(new SodaHost('https://data.edmonton.ca/'));

    this.developmentPermits = new SodaResource<DevelopmentPermit>(
      new SodaResourceId('8b78-2kux'),
      this,
      sodaClient
    );

    this.buildingPermits = new SodaResource<BuildingPermit>(
      new SodaResourceId('rwuh-apwg'),
      this,
      sodaClient
    );
  }
}
```

4. Inject your Context into your component, and query against it using fluent querying:

```js
@Component({
  selector: 'permits',
  templateUrl: './permits.component.html',
  styleUrls: ['./permits.component.css']
})
export class PermitsComponent implements OnInit {
  public Permits: DevelopmentPermit[];

  constructor(private context: OdpContext) { }

  ngOnInit() {
    this.context.developmentPermits
      .where(p => p.permit_type)
        .equals('Major Development Permit')
      .where(p => p.permit_date)
        .greaterThan(new FloatingTimestamp('04/23/1982 GMT'))
      .whereLocation(p => p.location)
        .withinCircle(new Location(53.540959, -113.493819, 2000))
      .observable()
      .subscribe(permits => this.Permits = permits);
  }
}
```

Can also use query builders for more control:

```js
const permitTypeCol = new Column('permit_type');
const permitValueCol = new Column('permit_value');
const permitClassCol = new Column('permit_class');

const query = new SoqlQueryBuilder(
  new WhereClause(
    new WhereFilter(
      permitTypeCol,
      Comparitor.Equals,
      new WhereValue('Major Development Permit'),
    ),
    new WhereOperator(Operator.And),
    new WhereGroup(
      new WhereFilter(
        permitValueCol,
        Comparitor.GreaterThan,
        new WhereValue(2000000),
      ),
      new WhereOperator(Operator.Or),
      new WhereGroup(
        new WhereFilter(
          permitClassCol,
          Comparitor.Equals,
          new WhereValue('Class B'),
        )
      )
    )
  ),
  new LimitClause(20)
);

this.context.developmentPermits
  .get(query)
  .subscribe(permits => this.Permits = permits);
```

## Notes
* This is a work in progress, watch this repository for updates.
* Context/Resource creation is subject to change in future releases.
* Fluent querying only currently does AND queries; OR coming soon.
* Support for additional column datatypes and functions are coming.
* Support for additional operators is coming.

## License

See [LICENSE](https://github.com/Daveography/soda-angular/blob/master/LICENSE).