import { FloatingTimestamp } from "../../src/datatypes/floating-timestamp";

describe("FloatingTimestamp", () => {
  it("should output ISO8601 date without zone on toString", () => {
    const ts = new FloatingTimestamp("04/23/1982");

    expect(ts.toString()).toEqual("1982-04-23T00:00:00.000");
  });

  it("should output ISO8601 date and time without zone on toString", () => {
    const ts = new FloatingTimestamp("04/23/1982 12:04:54");

    expect(ts.toString()).toEqual("1982-04-23T12:04:54.000");
  });

  it("should output the same ISO8601 date and time in toISOString as toString", () => {
    const ts = new FloatingTimestamp("04/23/1982 12:04:54");

    expect(ts.toString()).toEqual(ts.toISOString());
  });

  it("should create the equivalent of new Date()", () => {
    const ts = new FloatingTimestamp();
    const d = new Date();

    // Omit ms from comparison
    ts.setMilliseconds(0);
    d.setMilliseconds(0)

    expect(d).toEqual(ts);
  });

  it("should strip time component", () => {
    const ts = new FloatingTimestamp("04/23/1982 12:04:54");
    const stripedTs = ts.stripTime();

    expect(stripedTs.toString()).toEqual("1982-04-23T00:00:00.000");
  });
});
