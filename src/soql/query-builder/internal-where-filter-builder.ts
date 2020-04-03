import { WhereClause } from "../clauses/where/where-clause";
import { WhereFilter } from "../clauses/where/where-filter";
import { WhereFilterBuilder } from "./where-filter-builder";

export class InternalWhereFilterBuilder<TEntity> extends WhereFilterBuilder<TEntity> {
  public getWhereClause(): WhereClause {
    return new WhereClause(new WhereFilter(this.column, this.comparitor, this.value));
  }
}
