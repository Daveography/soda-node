import { ArrayUtils } from "../../src/utilities/array-utils";

describe("ArrayUtils", () => {

  it("should partition array on predicate", () => {
    const array = ["a", 1, 2, "b", "c", 3];
    const [num, alph] = ArrayUtils.partition<any>(array, x => Number.isInteger(x));

    expect(num).toEqual([1, 2, 3]);
    expect(alph).toEqual(["a", "b", "c"]);
  });
});