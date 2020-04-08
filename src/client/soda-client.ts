import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SoqlQueryBuilder } from '../soql-query-builder';
import { IQueryable } from '../soql-query/iqueryable';
import { ISodaResource } from "./soda-resource";

@Injectable({
  providedIn: "root",
})
export class SodaClient {

  constructor(private http: HttpClient) { }

  public getResource<TEntity>(resource: ISodaResource<TEntity>, query?: IQueryable<TEntity> | SoqlQueryBuilder): Observable<TEntity[]> {
    let getQuery = resource.getUrl();

    if (query) {
      getQuery += query.toString();
    }

    return this.http.get<TEntity[]>(getQuery);
  }
}
