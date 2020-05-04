import { SodaHostUrl } from "../../src/client/soda-host-url";

describe("SodaHostUrl", () => {

  it("should throw if host url is null", () => {
    const createFunc = () =>
      new SodaHostUrl(null);

    expect(createFunc).toThrow();
  });

  it("should throw if host url is empty", () => {
    const createFunc = () =>
      new SodaHostUrl("");

    expect(createFunc).toThrow();
  });

  it("should throw if not a valid url", () => {
    const createFunc = () =>
      new SodaHostUrl("random string");

    expect(createFunc).toThrow();
  });

  it("should create host if valid https url", () => {
    const host = new SodaHostUrl("https://data.opendata.org/");

    expect(host.toString()).toEqual("https://data.opendata.org/");
  });

  it("should create host if valid http url", () => {
    const host = new SodaHostUrl("http://data.opendata.org/");

    expect(host.toString()).toEqual("http://data.opendata.org/");
  });

  it("should add trailing slash if not included", () => {
    const host = new SodaHostUrl("https://data.opendata.org");

    expect(host.toString()).toEqual("https://data.opendata.org/");
  });

});
