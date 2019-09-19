import { SodaHost } from "./soda-host";

export abstract class SodaContext {
  constructor(readonly host: SodaHost) { }
}
