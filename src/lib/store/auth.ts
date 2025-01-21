import { StoreKey } from "@lib/store";
import { persistentAtom } from "@nanostores/persistent";

export const $accessToken = persistentAtom<string>(StoreKey.AccessToken, "");
