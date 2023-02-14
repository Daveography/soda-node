import { SodaHostUrl } from "./soda-host-url";
import { ISodaClient } from './isoda-client';
import { AxiosSodaClient } from "./axios-client";

export abstract class SodaContext {
  readonly Host!: SodaHostUrl;
  readonly Client!: ISodaClient;

  constructor(client: ISodaClient = new AxiosSodaClient()) {
    this.Client = client;
  }
}
