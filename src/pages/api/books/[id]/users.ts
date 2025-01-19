import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request, params }) => {
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

  const admin = await DB.prepare(
    "SELECT * FROM users WHERE ulid = ? AND role = 0",
  )
    .bind(userUlid)
    .first();

  if (!admin) {
    return new Response("Forbidden", { status: 403 });
  }

  const { id } = params;

  const { userUlids } = await request.json();

  try {
    const stmt = await DB.prepare(
      "INSERT INTO user_book_rels (userUlid, bookUlid, sum) VALUES (?, ?, 0)",
    );

    await DB.batch(
      userUlids.map((userUlid: string) => stmt.bind(userUlid, id)),
    );

    return Response.json({ success: true });
  } catch (error) {
    return new Response("Bad Request", { status: 400 });
  }
};
