import { IWhereComponent } from "./where-component";

export class WhereGroup implements IWhereComponent {
  public readonly Components: IWhereComponent[];

  constructor(...components: IWhereComponent[]) {
    this.Components = components;
  }

  public add(...components: IWhereComponent[]) {
    this.Components.push(...components);
  }

  public toString(): string {
    if (this.Components && this.Components.length > 0) {
      return `(${this.Components.join(" ")})`;
    }

    return "";
  }

  protected getComponents(): IWhereComponent[] {
    return this.Components;
  }
}
