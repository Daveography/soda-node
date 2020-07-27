import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IQueryable } from '../fluent-query/iqueryable';
import { SoqlQuery } from '../soql-query';
import { ISodaResource } from "./isodaresource";

@Injectable({
  providedIn: "root",
})
export class SodaClient {

  constructor(private http: HttpClient) { }

  public getResource<TEntity>(resource: ISodaResource<TEntity>, query?: IQueryable<TEntity> | SoqlQuery): Observable<TEntity[]> {
    let getQuery = resource.getUrl();

    if (query) {
      getQuery += query.toString();
    }

    return this.http.get<TEntity[]>(getQuery);
  }
}
