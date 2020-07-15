import { SodaHostUrl } from "./soda-host-url";

export function SodaHost(hostUrl: string) {
  // tslint:disable-next-line: only-arrow-functions
  return function <T extends new(...args: any[]) => {}>(constructor: T) {
      return class extends constructor {
        Host = new SodaHostUrl(hostUrl);
      }
  }
}
