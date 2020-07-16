import { SodaHost } from "../../src/client/soda-host-decorator";
import { SodaContext } from '../../src/client/soda-context';
import { SodaDataset } from "../../src/client/soda-dataset-decorator";
import { SodaResource } from "../../src/client";

describe("SodaResource", () => {

  @SodaDataset("abcd-efgh")
  class SampleResource { }

  // tslint:disable-next-line: max-classes-per-file
  @SodaHost("https://data.opendata.org/")
  class SampleContext extends SodaContext {
    constructor() { super(null); }
    res = new SodaResource(SampleResource, this);
  }

  it("should add set resource id from decorated resource class", () => {
    const context = new SampleContext();
    expect(context.res.Id.toString()).toEqual("abcd-efgh");
  });
});
