export enum Comparitor {
  Equals = "=",
  GreaterThan = ">",
  LessThan = "<",
  IsNull = "IS NULL",
  IsNotNull = "IS NOT NULL",
}

export namespace Comparitor {
  export function isCheckingNull(comparitor: Comparitor): boolean {
    return comparitor === Comparitor.IsNull
      || comparitor === Comparitor.IsNotNull;
  }
}
