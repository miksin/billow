import { $accessToken } from "./auth";

export type Query<T> = {
  data: T | null;
  error: unknown;
  isLoading: boolean;
};

export type FetcherState = {
  isLoading: boolean;
  error: unknown;
};

export const fetcher = async <T>(uri: string) => {
  try {
    const res = await fetch(uri, {
      headers: { Authorization: `Bearer ${$accessToken.get()}` },
    });
    return (await res.json()) as T;
  } catch (err) {
    throw err;
  }
};
