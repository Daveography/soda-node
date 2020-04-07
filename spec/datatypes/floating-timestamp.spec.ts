import { FloatingTimestamp } from "../../src/datatypes/floating-timestamp";

describe("FloatingTimestamp", () => {

  it("should output ISO8601 time on toString", () => {
    const ts = new FloatingTimestamp("04/23/1982 12:00:00 UTC");

    expect(ts.toString())
      .toEqual("1982-04-23T12:00:00.000Z");
  });

});
