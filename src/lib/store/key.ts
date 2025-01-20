export const StoreKey = {
  AccessToken: "accessToken",
  ApiBooks: "/api/books",
} as const;
export type StoreKey = (typeof StoreKey)[keyof typeof StoreKey];
