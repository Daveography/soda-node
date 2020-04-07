import { IClause } from "./clauses/clause";

export class SoqlQueryBuilder {
  public readonly Clauses: IClause[];

  constructor(...params: IClause[]) {
    this.Clauses = params;
  }

  public toString(): string {
    if (this.Clauses && this.Clauses.length > 0) {
      const clauses = this.Clauses.map(x => x.toString())
        .join("&");

      return `?${clauses}`;
    }

    return "";
  }
}
