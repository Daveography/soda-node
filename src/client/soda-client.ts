import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IQueryable } from '../soql-query/iqueryable';
import { ISodaResource } from "./soda-resource";

@Injectable({
  providedIn: "root",
})
export class SodaClient {

  constructor(private http: HttpClient) { }

  public getResource<TEntity>(resource: ISodaResource<TEntity>, query?: IQueryable<TEntity>): Observable<TEntity[]> {
    const baseUrl = resource.getResourceUrl();
    let getQuery = baseUrl;

    if (query) {
      getQuery = `${baseUrl}${query}`
    }

    return this.http.get<TEntity[]>(getQuery);
  }
}
