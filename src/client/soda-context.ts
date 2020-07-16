import { SodaHostUrl } from "./soda-host-url";
import { SodaClient } from './soda-client';

export abstract class SodaContext {
  readonly Host: SodaHostUrl;
  readonly Client: SodaClient;

  constructor(client: SodaClient) {
    this.Client = client;
  }
}
