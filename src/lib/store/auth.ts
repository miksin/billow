import { persistentAtom } from "@nanostores/persistent";
import { StoreKey } from "./key";

export const $accessToken = persistentAtom<string>(StoreKey.AccessToken, "");
