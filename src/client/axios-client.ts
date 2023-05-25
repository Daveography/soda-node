import { Axios } from "axios";
import { IQueryable } from "../fluent-query/iqueryable";
import { SoqlQuery } from "../soql-query";
import { ISodaClient } from "./isoda-client";
import { ISodaResource } from "./isoda-resource";

export class AxiosSodaClient implements ISodaClient {
  public getResource<TEntity>(
    resource: ISodaResource<TEntity>,
    query?: IQueryable<TEntity> | SoqlQuery
  ): Promise<TEntity[]> {
    let getQuery = resource.getUrl();

    if (query) {
      getQuery += query.toString();
    }

    return new Axios().get<TEntity[]>(getQuery)
      .then(res => res.data);
  }
}
