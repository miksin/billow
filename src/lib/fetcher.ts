import { $accessToken } from "@lib/store/auth";

export type FetcherOptions = {
  method: string;
  params?: Record<string, string>;
  body?: BodyInit;
};

export const fetcher = async <T>(
  uri: string,
  options: FetcherOptions = { method: "GET" },
) => {
  const { method, params, body } = options;
  const url = new URL(uri, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${$accessToken.get()}` },
      method,
      body,
    });
    return (await res.json()) as T;
  } catch (err) {
    throw err;
  }
};
