import "reflect-metadata";
import { SodaResourceId } from "../../src/client/soda-resource-id";
import {
  resourceMetadataKey,
  SodaDataset,
} from "../../src/client/soda-dataset-decorator";

describe("SodaDataset", () => {
  @SodaDataset("abcd-efgh")
  class SampleResource {}

  it("should add dataset id to decorated class metadata", () => {
    const metadata = Reflect.getMetadata(
      resourceMetadataKey,
      SampleResource
    ) as SodaResourceId;
    expect(metadata.toString()).toEqual("abcd-efgh");
  });
});
