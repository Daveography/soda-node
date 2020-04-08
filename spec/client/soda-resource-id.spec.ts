import { SodaResourceId } from "../../src/client/soda-resource-id";

describe("SodaResourceId", () => {

  it("should throw if resource id is null", () => {
    const createFunc = () =>
      new SodaResourceId(null);

    expect(createFunc).toThrow();
  });

  it("should throw if resource id is empty", () => {
    const createFunc = () =>
      new SodaResourceId("");

    expect(createFunc).toThrow();
  });

  it("should throw if not a valid resource id", () => {
    const createFunc = () =>
      new SodaResourceId("random string");

    expect(createFunc).toThrow();
  });

  it("should create resource id if valid", () => {
    let host = new SodaResourceId("5he8-f83h");

    expect(host.toString()).toEqual("5he8-f83h");

    host = new SodaResourceId("aaaa-aaaa");

    expect(host.toString()).toEqual("aaaa-aaaa");

    host = new SodaResourceId("1234-5678");

    expect(host.toString()).toEqual("1234-5678");

    host = new SodaResourceId("1234-abcd");

    expect(host.toString()).toEqual("1234-abcd");
  });
});
