import { createToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return Response.json({ error: "Invalid credentials." }, { status: 401 });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return Response.json({ error: "Invalid credentials." }, { status: 401 });
  if (!user.verifiedAt) return Response.json({ error: "Please verify email first." }, { status: 403 });

  const token = createToken(user.id);
  const response = Response.json({ ok: true });
  response.headers.set("Set-Cookie", `smartparking_token=${token}; Path=/; HttpOnly; SameSite=Lax`);
  return response;
}
