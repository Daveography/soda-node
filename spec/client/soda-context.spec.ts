import { SodaHost } from "../../src/client/soda-host-decorator";
import { SodaContext } from '../../src/client/soda-context';

describe("SodaContext", () => {

  @SodaHost("https://data.opendata.org/")
  class SampleContext extends SodaContext { }

  it("should add host property to decorated class", () => {
    const context = new SampleContext(null);
    expect(context.Host.toString()).toEqual("https://data.opendata.org/");
  });
});
