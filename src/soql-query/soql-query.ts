import { ArrayUtils } from '../utilities/array-utils';
import { WhereClause } from './clauses';
import { IClause } from "./clauses/clause";

export class SoqlQuery {
  private clauses: IClause[];
  private whereClause: WhereClause;

  public get Clauses(): IClause[] { return this.clauses };
  public get WhereClause(): WhereClause { return this.whereClause };

  constructor(...clauses: IClause[]) {
    [this.clauses, this.whereClause] = this.splitClauses(clauses);
  }

  public toString(): string {
    let clauses = this.Clauses;

    if (!this.WhereClause.isEmpty()) {
      clauses = [...clauses, this.WhereClause];
    }

    if (clauses && clauses.length > 0) {
      const clauseString = clauses.map(x => x.toString())
        .join("&");

      return `?${clauseString}`;
    }

    return "";
  }

  public clone(): SoqlQuery {
    const newSoqlQuery = new SoqlQuery();
    newSoqlQuery.clauses = [...this.clauses];
    newSoqlQuery.whereClause = new WhereClause(...this.whereClause.Components);
    return newSoqlQuery;
  }

  private splitClauses(clauses: IClause[]): [IClause[], WhereClause] {
    let otherClauses: IClause[];
    let whereClause: WhereClause;

    if (clauses && clauses.length > 0) {
      const [whereClauses, remainingClauses] = ArrayUtils.partition(clauses, this.isWhereClause);

      whereClause = new WhereClause(
        ...whereClauses.flatMap(clause => (clause as WhereClause).Components)
      );

      otherClauses = remainingClauses;
    }
    else {
      otherClauses = new Array<IClause>();
      whereClause = new WhereClause();
    }

    return [otherClauses, whereClause];
  }

  private isWhereClause = (clause: IClause): clause is WhereClause => clause instanceof WhereClause;
}
