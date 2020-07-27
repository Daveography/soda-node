import { IClause } from '.';
import { IWhereComponent } from './clauses';
import { SoqlQuery } from './soql-query';

export class SoqlQueryBuilder {

  constructor(private builder?: SoqlQuery) {
    if (!builder) {
      this.builder = new SoqlQuery();
    }
  }

  public addClause(clause: IClause): SoqlQueryBuilder {
    const newBuilder = this.builder.clone();
    newBuilder.Clauses.push(clause);
    return new SoqlQueryBuilder(newBuilder);
  }

  public addFilter(...filter: IWhereComponent[]): SoqlQueryBuilder {
    const newBuilder = this.builder.clone();
    newBuilder.WhereClause.add(...filter);
    return new SoqlQueryBuilder(newBuilder);
  }

  public toString(): string {
    return this.builder.toString();
  }

  public hasFilters(): boolean {
    return !this.builder.WhereClause.isEmpty();
  }
}
