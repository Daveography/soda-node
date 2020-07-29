import { Geometry } from 'geojson';
import { Observable } from "rxjs";
import { Location } from '../datatypes/location';
import { DataSetColumn } from '../fluent-query/dataset-column';
import { IGeometryFilter } from '../fluent-query/filters/igeometryfilter';
import { ILocationFilter } from '../fluent-query/filters/ilocationfilter';
import { IWhereFilter } from '../fluent-query/filters/iwherefilter';
import { FluentQuery } from '../fluent-query/fluent-query';
import { IQueryable } from '../fluent-query/iqueryable';
import { SoqlQuery } from '../soql-query';
import { ColumnType } from '../soql-query/clauses/column-types';
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

  public get(query: SoqlQuery): Observable<TEntity[]> {
    return this.Context.Client.getResource(this, query);
  }

  public select<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IQueryable<TEntity> {
    return this.createQuery().select(column);
  }

  public where<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>): IWhereFilter<TEntity, TValue> {
    return this.createQuery().where(column);
  }

  public location(column: (type: TEntity) => Location): ILocationFilter<TEntity> {
    return this.createQuery().location(column);
  }

  public geometry(column: (type: TEntity) => Geometry): IGeometryFilter<TEntity> {
    return this.createQuery().geometry(column);
  }

  public limit(records: number): IQueryable<TEntity> {
    return this.createQuery().limit(records);
  }

  public offset(records: number): IQueryable<TEntity> {
    return this.createQuery().offset(records);
  }

  public orderBy<TValue extends ColumnType>(column: DataSetColumn<TEntity, TValue>, descending?: boolean): IQueryable<TEntity> {
    return this.createQuery().orderBy(column, descending);
  }

  private createQuery(): FluentQuery<TEntity> {
    return new FluentQuery(this);
  }
}
