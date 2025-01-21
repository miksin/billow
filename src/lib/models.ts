export type Book = {
  ulid: string;
  name: string;
  currency: string;
  status: number;
};

export type UserBookRel = {
  userUlid: string;
  bookUlid: string;
  sum: number;
};
