import { createMock } from "ts-auto-mock";
import { SodaContext, SodaDataset, SodaResource } from "../../src/client";

describe("SodaResource", () => {
  @SodaDataset("abcd-efgh")
  class SampleDataset {}

  class BadDataset {}

  it("should set resource id from decorated dataset class", () => {
    const res = new SodaResource(SampleDataset, createMock<SodaContext>());
    expect(res.Id.toString()).toEqual("abcd-efgh");
  });

  it("should throw if creating resource with undecorated dataset class", () => {
    const createFunc = () =>
      new SodaResource(BadDataset, createMock<SodaContext>());

    expect(createFunc).toThrow();
  });
});
