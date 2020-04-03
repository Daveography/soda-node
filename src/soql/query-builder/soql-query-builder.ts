import { SelectClause } from "../clauses";
import { IClause } from "../clauses/clause";
import { Column } from "../clauses/column";
import { LimitClause } from "../clauses/limit-clause";
import { OffsetClause } from "../clauses/offset-clause";
import { InternalWhereFilterBuilder } from "./internal-where-filter-builder";
import { WhereFilterBuilder } from "./where-filter-builder";

export interface ISoqlQueryBuilder<TEntity> {
  select<TValue>(column: (type: TEntity) => TValue): this;
  where<TValue>(column: (type: TEntity) => TValue): WhereFilterBuilder<TEntity>;
  limit(records: number): this;
  offset(records: number): this;
}

export class SoqlQueryBuilder<TEntity> implements ISoqlQueryBuilder<TEntity> {
  protected clauses: IClause[];
  protected whereBuilders: InternalWhereFilterBuilder<TEntity>[];

  constructor() {
    this.clauses = new Array<IClause>();
    this.whereBuilders = new Array<InternalWhereFilterBuilder<TEntity>>();
  }

  // TODO: Add overload to accept multiple columns as parameters
  public select<TValue>(column: (type: TEntity) => TValue): this {
    this.clauses.push(new SelectClause(Column.of(column)));
    return this;
  }

  public where<TValue>(column: (type: TEntity) => TValue): WhereFilterBuilder<TEntity> {
    const whereBuilder = new InternalWhereFilterBuilder(this, Column.of(column));
    this.whereBuilders.push(whereBuilder);
    return whereBuilder as WhereFilterBuilder<TEntity>;
  }

  public limit(records: number): this {
    this.clauses.push(new LimitClause(records));
    return this;
  }

  public offset(records: number): this {
    this.clauses.push(new OffsetClause(records));
    return this;
  }
}
