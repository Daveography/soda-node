import { SodaResource } from "../../src/client";
import { SodaDataset } from "../../src/client/soda-dataset-decorator";

describe("SodaResource", () => {

  @SodaDataset("abcd-efgh")
  class SampleDataset { }

  class BadDataset { }

  it("should set resource id from decorated dataset class", () => {
    const res = new SodaResource(SampleDataset, null);
    expect(res.Id.toString()).toEqual("abcd-efgh");
  });

  it("should throw if creating resource with undecorated dataset class", () => {
    const createFunc = () =>
      new SodaResource(BadDataset, null);

      expect(createFunc).toThrow();
  });
});
