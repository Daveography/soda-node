import { IClause } from '.';
import { IWhereComponent } from './clauses';
import { SoqlQueryBuilder } from './soql-query-builder';

export class ImmutableSoqlQueryBuilder {

  constructor(private builder?: SoqlQueryBuilder) {
    if (!builder) {
      this.builder = new SoqlQueryBuilder();
    }
  }

  public addClause(clause: IClause): ImmutableSoqlQueryBuilder {
    const newBuilder = this.builder.clone();
    newBuilder.Clauses.push(clause);
    return new ImmutableSoqlQueryBuilder(newBuilder);
  }

  public addFilter(...filter: IWhereComponent[]): ImmutableSoqlQueryBuilder {
    const newBuilder = this.builder.clone();
    newBuilder.WhereClause.add(...filter);
    return new ImmutableSoqlQueryBuilder(newBuilder);
  }

  public toString(): string {
    return this.builder.toString();
  }

  public hasFilters(): boolean {
    return !this.builder.WhereClause.isEmpty();
  }
}
