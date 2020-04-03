import { Column } from "../clauses/column";
import { Comparitor } from "../clauses/where/comparitor";
import { WhereStringValue } from "../clauses/where/where-string-value";
import { IWhereValue } from "../clauses/where/where-value";
import { ISoqlQueryBuilder } from "./soql-query-builder";

export class WhereFilterBuilder<TEntity> {
  protected column: Column;
  protected comparitor: Comparitor;
  protected value: IWhereValue;
  private queryBuilder: ISoqlQueryBuilder<TEntity>;

  public constructor(queryBuilder: ISoqlQueryBuilder<TEntity>, column: Column) {
    if (queryBuilder === null) {
      throw new Error("queryBuilder must be provided");
    }
    if (column === null) {
      throw new Error("column must be provided");
    }

    this.queryBuilder = queryBuilder;
    this.column = column;
  }

  public equals(value: string): ISoqlQueryBuilder<TEntity> {
    if (value === null) {
      throw new Error("value must be provided");
    }

    this.comparitor = Comparitor.Equals;
    this.value = new WhereStringValue(value);
    return this.queryBuilder;
  }

  public isNull(): ISoqlQueryBuilder<TEntity> {
    this.comparitor = Comparitor.IsNull;
    return this.queryBuilder;
  }

  public isNotNull(): ISoqlQueryBuilder<TEntity> {
    this.comparitor = Comparitor.IsNotNull;
    return this.queryBuilder;
  }
}
