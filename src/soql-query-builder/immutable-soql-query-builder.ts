import { IClause } from '.';
import { SoqlQueryBuilder } from './soql-query-builder';

export class ImmutableSoqlQueryBuilder {

  constructor(private builder?: SoqlQueryBuilder) {
    if (!builder) {
      this.builder = new SoqlQueryBuilder();
    }
  }

  addClause(clause: IClause): ImmutableSoqlQueryBuilder {
    const newBuilder = new SoqlQueryBuilder(...this.builder.Clauses.concat(clause));
    return new ImmutableSoqlQueryBuilder(newBuilder);
  }

  toString() {
    return this.builder.toString();
  }
}