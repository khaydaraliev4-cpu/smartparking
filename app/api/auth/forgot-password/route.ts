export async function POST() {
  return Response.json({ ok: true, message: "If account exists, reset instructions were sent." });
}
