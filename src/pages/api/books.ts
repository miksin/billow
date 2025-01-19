import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, request }) => {
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

  const { results } = await DB.prepare(
    "SELECT * FROM user_book_rels WHERE userUlid = ?",
  )
    .bind(userUlid)
    .all();
  return Response.json(results);
};
