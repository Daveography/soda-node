import { SodaHost } from "../../src/client/soda-host";

describe("SodaHost", () => {

  it("should throw if host url is null", () => {
    const createFunc = () =>
      new SodaHost(null);

    expect(createFunc).toThrow();
  });

  it("should throw if host url is empty", () => {
    const createFunc = () =>
      new SodaHost("");

    expect(createFunc).toThrow();
  });

  it("should throw if not a valid url", () => {
    const createFunc = () =>
      new SodaHost("random string");

    expect(createFunc).toThrow();
  });

  it("should create host if valid https url", () => {
    const host = new SodaHost("https://data.edmonton.ca/");

    expect(host.toString()).toEqual("https://data.edmonton.ca/");
  });

  it("should create host if valid http url", () => {
    const host = new SodaHost("http://data.edmonton.ca/");

    expect(host.toString()).toEqual("http://data.edmonton.ca/");
  });

  it("should add trailing slash if not included", () => {
    const host = new SodaHost("https://data.edmonton.ca");

    expect(host.toString()).toEqual("https://data.edmonton.ca/");
  });

});
