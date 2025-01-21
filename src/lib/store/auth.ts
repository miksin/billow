import { persistentAtom } from "@nanostores/persistent";
import { StoreKey } from ".";

export const $accessToken = persistentAtom<string>(StoreKey.AccessToken, "");
