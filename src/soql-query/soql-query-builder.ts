import { IClause } from '.';
import { IWhereComponent } from './clauses';
import { SoqlQuery } from './soql-query';

export class SoqlQueryBuilder {

  constructor(private soqlQuery?: SoqlQuery) {
    if (!soqlQuery) {
      this.soqlQuery = new SoqlQuery();
    }
  }

  public addClause(clause: IClause): SoqlQueryBuilder {
    const newQuery = this.soqlQuery.clone();
    newQuery.Clauses.push(clause);
    return new SoqlQueryBuilder(newQuery);
  }

  public addFilter(...filter: IWhereComponent[]): SoqlQueryBuilder {
    const newBuilder = this.soqlQuery.clone();
    newBuilder.WhereClause.add(...filter);
    return new SoqlQueryBuilder(newBuilder);
  }

  public toString(): string {
    return this.soqlQuery.toString();
  }

  public hasFilters(): boolean {
    return !this.soqlQuery.WhereClause.isEmpty();
  }
}
