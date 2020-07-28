import { IClause } from "./clauses/clause";

export class SoqlQuery {
  public readonly Clauses: IClause[];

  constructor(...params: IClause[]) {
    this.Clauses = params;
    Object.freeze(this.Clauses);
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
