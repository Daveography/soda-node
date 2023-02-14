import { ISodaClient, SodaContext, SodaHost } from "../../src/client";
import { createMock } from "ts-auto-mock";

describe("SodaContext", () => {
  @SodaHost("https://data.opendata.org/")
  class SampleContext extends SodaContext {}

  it("should add host property to decorated class", () => {
    const context = new SampleContext(createMock<ISodaClient>());
    expect(context.Host.toString()).toEqual("https://data.opendata.org/");
  });
});
