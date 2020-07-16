import { Geometry } from 'geojson';
import { Observable } from "rxjs";
import { ColumnType } from 'src/soql-query-builder/clauses/column-types';
import { Location } from '../datatypes/location';
import { SoqlQueryBuilder } from '../soql-query-builder';
import { IGeometryFilter } from '../soql-query/igeometryfilter';
import { ILocationFilter } from '../soql-query/ilocationfilter';
import { IQueryable } from '../soql-query/iqueryable';
import { IWhereFilter } from '../soql-query/iwherefilter';
import { SoqlQuery } from '../soql-query/soql-query';
import { ISodaResource } from './isodaresource';
import { SodaContext } from "./soda-context";
import { resourceMetadataKey } from './soda-dataset-decorator';
import { SodaResourceId } from "./soda-resource-id";

export class SodaResource<TEntity> implements ISodaResource<TEntity>, IQueryable<TEntity> {

  public readonly Id: SodaResourceId;
  public readonly Context: SodaContext;

  constructor(
    TDatasetClass: new (...args: unknown[]) => TEntity,
    context: SodaContext
  ) {
      const resourceIdMetadata = Reflect.getMetadata(resourceMetadataKey, TDatasetClass) as SodaResourceId

      if (!resourceIdMetadata) {
        throw new Error(`Class '${TDatasetClass.name}' must have a SodaDatasetId decorator`);
      }

      this.Id = resourceIdMetadata;
      this.Context = context;
  }

  public getUrl(): string {
    return `${this.Context.Host}resource/${this.Id}.json`;
  }

  public observable(): Observable<TEntity[]> {
    return this.Context.Client.getResource(this);
  }

  public get(query: SoqlQueryBuilder): Observable<TEntity[]> {
    return this.Context.Client.getResource(this, query);
  }

  public select<TValue extends ColumnType>(column: (type: TEntity) => TValue): IQueryable<TEntity> {
    return this.createQuery().select(column);
  }

  public where<TValue extends ColumnType>(column: (type: TEntity) => TValue): IWhereFilter<TEntity, TValue> {
    return this.createQuery().where(column);
  }

  public whereLocation(column: (type: TEntity) => Location): ILocationFilter<TEntity> {
    return this.createQuery().whereLocation(column);
  }

  public whereGeometry(column: (type: TEntity) => Geometry): IGeometryFilter<TEntity> {
    return this.createQuery().whereGeometry(column);
  }

  public limit(records: number): IQueryable<TEntity> {
    return this.createQuery().limit(records);
  }

  public offset(records: number): IQueryable<TEntity> {
    return this.createQuery().offset(records);
  }

  private createQuery(): SoqlQuery<TEntity> {
    return new SoqlQuery(this);
  }
}
