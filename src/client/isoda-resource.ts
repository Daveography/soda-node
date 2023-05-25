import { SodaContext } from "./";
import { SoqlQuery, SoqlQueryBuilder } from "../soql-query";
import { SodaResourceId } from "./soda-resource-id";

export interface ISodaResource<TEntity> {
  Id: SodaResourceId;
  Context: SodaContext;
  getUrl(): string;
  promise(): Promise<TEntity[]>;
  get(query: SoqlQuery | SoqlQueryBuilder): Promise<TEntity[]>;
}
