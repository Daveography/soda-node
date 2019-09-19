# soda-angular
Socrata SODA client for Angular

## Installation

```bash
npm install soda-angular --save
```

## Usage

Extend `SodaContext` with your own service context, providing the URL to the Socrata service of your choice.

Create your `SodaResource` objects with a dataset model to access specific datasets:

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

Inject your Context into your component, and query against it:

```js
@Component({
  selector: 'permits',
  templateUrl: './permits.component.html',
  styleUrls: ['./permits.component.css']
})
export class PermitsComponent implements OnInit {
  public Permits: DevelopmentPermit[];

  constructor(
    private context: OdpContext,
    ) { }

  ngOnInit() {
    this.context.developmentPermits
      .getAll()
      .subscribe(permits => this.Permits = permits);
  }
}
```

## Notes
* This is a work in progress, watch this repository for updates.
* Context/Resource creation is subject to change in future releases
* Query building is coming soon

## License

See [LICENSE](https://github.com/Daveography/soda-angular/blob/master/LICENSE).