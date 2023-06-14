import { Polybase } from "@polybase/client";

export const polybase = new Polybase({
  defaultNamespace: "block-cms",
  baseURL: `https://testnet.polybase.xyz/v0`,
});
