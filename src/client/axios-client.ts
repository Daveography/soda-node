import { Axios } from "axios-observable";
import { map, Observable } from "rxjs";
import { IQueryable } from "../fluent-query/iqueryable";
import { SoqlQuery } from "../soql-query";
import { ISodaClient } from "./isoda-client";
import { ISodaResource } from "./isoda-resource";

export class AxiosSodaClient implements ISodaClient {
  public getResource<TEntity>(
    resource: ISodaResource<TEntity>,
    query?: IQueryable<TEntity> | SoqlQuery
  ): Observable<TEntity[]> {
    let getQuery = resource.getUrl();

    if (query) {
      getQuery += query.toString();
    }

    return Axios.get<TEntity[]>(getQuery).pipe(
      map((axiosResponse) => axiosResponse.data)
    );
  }
}
