/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SodaHostUrl } from "./soda-host-url";

export function SodaHost(hostUrl: string) {
  return function <T extends new(...args: any[]) => {}>(constructor: T) {
      return class extends constructor {
        Host = new SodaHostUrl(hostUrl);
      }
  }
}
