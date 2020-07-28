import { WhereGroup } from "./where-group";

export class WhereClause extends WhereGroup {

  public toString(): string {
    if (this.Components.length > 0) {
      const joinedComponents = this.Components.map(x => x.toString())
        .join(" ");

      return `$where=${joinedComponents}`;
    }

    return "";
  }
}
