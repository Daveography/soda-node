import { WhereGroup } from "./where-group";

export class WhereClause extends WhereGroup {

  public toString(): string {
    const components = super.getComponents();

    if (components.length > 0) {
      return `$where=${components.join(" ")}`;
    }

    return "";
  }
}
