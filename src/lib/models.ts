export type Book = {
  ulid: string;
  name: string;
  currency: Currency;
  thumbnail: string; // TODO: add to schema
  status: BookStatus;
};

export type UserBookRel = {
  userUlid: string;
  bookUlid: string;
  sum: number;
};

export const BookStatus = {
  Archived: 0,
  Active: 1,
} as const;
export type BookStatus = (typeof BookStatus)[keyof typeof BookStatus];

export const Currency = {
  JPY: "JPY",
  TWD: "TWD",
  USD: "USD",
} as const;
export type Currency = (typeof Currency)[keyof typeof Currency];
