import { IClause } from '.';
import { Operator, WhereClause, WhereFilter, WhereOperator } from './clauses';
import { SoqlQueryBuilder } from './soql-query-builder';
import { ArrayUtils } from '../utilities/array-utils';

export class ImmutableSoqlQueryBuilder {

  constructor(private builder?: SoqlQueryBuilder) {
    if (!builder) {
      this.builder = new SoqlQueryBuilder();
    }
  }

  addClause(clause: IClause): ImmutableSoqlQueryBuilder {
    const newBuilder = new SoqlQueryBuilder(...this.builder.Clauses, clause);
    return new ImmutableSoqlQueryBuilder(newBuilder);
  }

  addFilter<TValue>(filter: WhereFilter<TValue>): ImmutableSoqlQueryBuilder {
    const [whereClauses, otherClauses] = ArrayUtils.partition(this.builder.Clauses, this.isWhereClause);

    // Ensure only one WhereClause exists
    if (whereClauses.length > 0) {
      const newWhereClause = new WhereClause(
        ...whereClauses.flatMap(clause => (clause as WhereClause).Components),
        new WhereOperator(Operator.And),
        filter
      );

      const newBuilder = new SoqlQueryBuilder(...otherClauses, newWhereClause);
      return new ImmutableSoqlQueryBuilder(newBuilder);
    }

    return this.addClause(new WhereClause(filter));
  }

  toString() {
    return this.builder.toString();
  }

  private isWhereClause = (clause: IClause): clause is WhereClause => clause instanceof WhereClause;
}