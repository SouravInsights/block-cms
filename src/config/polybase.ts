import { Polybase } from "@polybase/client";

export const db = new Polybase({
  defaultNamespace: "block-cms",
  baseURL: `https://testnet.polybase.xyz/v0`,
});

export const userProjectDb = (publickKey: string, projectName: string) => {
  new Polybase({
    defaultNamespace: `block-cms/${publickKey}/.${projectName}`,
  });
}
