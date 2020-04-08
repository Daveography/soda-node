export class ArrayUtils {
  public static partition<T>(array: T[], predicate: (type: T) => boolean): [T[], T[]] {
    return array.reduce(([pass, fail], elem) => {
      return predicate(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
  }
}