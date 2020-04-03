import { SoqlQuery } from "../soql-query";
import { SoqlQueryBuilder } from "./soql-query-builder";

export class InternalSoqlQueryBuilder<TEntity> extends SoqlQueryBuilder<TEntity> {
  public getSoqlQuery(): SoqlQuery {
    this.processWhereClauses();
    return new SoqlQuery(...this.clauses);
  }

  private processWhereClauses(): void {
    this.clauses.push(...this.whereBuilders.map(x => x.getWhereClause()));
  }
}
