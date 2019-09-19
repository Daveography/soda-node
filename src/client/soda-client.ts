import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ISodaResource } from "./soda-resource";

@Injectable({
  providedIn: "root",
})
export class SodaClient {

  constructor(private http: HttpClient) { }

  public getResource<TEntity>(resource: ISodaResource<TEntity>): Observable<TEntity[]> {
    return this.http.get<TEntity[]>(resource.getResourceUrl());
  }
}
