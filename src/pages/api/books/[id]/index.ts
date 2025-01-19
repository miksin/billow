import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, request, params }) => {
  const { DB } = locals.runtime.env;

  // Retrieve the access token from the Authorization header
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const accessToken = authHeader.replace("Bearer ", "").trim();

  const userUlid = await DB.prepare(
    "SELECT userUlid FROM access_tokens WHERE token = ? AND expiredAt > CURRENT_TIMESTAMP",
  )
    .bind(accessToken)
    .first("userUlid");

  if (!userUlid) {
    return new Response("Invalid Token", { status: 401 });
  }

  const { id } = params;

  const userBookRel = await DB.prepare(
    "SELECT * FROM user_book_rels WHERE userUlid = ? AND bookUlid = ?",
  )
    .bind(userUlid, id)
    .first();

  if (!userBookRel) {
    return new Response("Not Found", { status: 404 });
  }

  const book = await DB.prepare("SELECT * FROM books WHERE ulid = ?")
    .bind(id)
    .first();

  const { results } = await DB.prepare(
    "SELECT * \
      FROM expenses e LEFT JOIN (\
        SELECT * \
        FROM user_expense_rels \
        WHERE userUlid = ? \
      ) uer \
      ON e.ulid = uer.expenseUlid \
      WHERE e.bookUlid = ?",
  )
    .bind(userUlid, id)
    .all();

  return Response.json({
    ...book,
    expenses: results,
  });
};
