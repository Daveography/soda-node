import { IWhereComponent } from "./where-component";

export class WhereGroup implements IWhereComponent {
  public readonly Components: IWhereComponent[];

  constructor(...components: IWhereComponent[]) {
    this.Components = components;
    Object.freeze(this.Components);
  }

  public isEmpty(): boolean {
    return this.Components.length === 0;
  }

  public toString(): string {
    if (this.Components && this.Components.length > 0) {
      return `(${this.Components.join(" ")})`;
    }

    return "";
  }
}
